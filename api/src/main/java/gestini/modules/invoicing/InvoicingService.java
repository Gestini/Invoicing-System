package gestini.modules.invoicing;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import gestini.modules.businessUnit.models.BusinessUnitModel;
import gestini.modules.businessUnit.repositories.BusinessUnitsRepository;
import gestini.modules.inventory.models.BusinessUnitInventoryModel;
import gestini.modules.inventory.repositories.InventoryRepository;
import gestini.modules.invoicing.dto.InvoicingProductRequestDto;
import gestini.modules.invoicing.dto.InvoicingRequestDto;
import gestini.modules.invoicing.models.InvoicingModel;
import gestini.modules.invoicing.models.InvoicingProductModel;
import gestini.modules.invoicing.repositories.InvoicingProductRepository;
import gestini.modules.invoicing.repositories.InvoicingRepository;
import gestini.modules.product.models.ProductModel;
import gestini.modules.product.repositories.ProductRepository;
import gestini.modules.user.UserService;

@Service
public class InvoicingService {

    @Autowired
    private InvoicingRepository invoicingRepository;

    @Autowired
    private BusinessUnitsRepository businessUnitsRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private InventoryRepository inventoryRepository;

    @Autowired
    private InvoicingProductRepository invoicingProductRepository;

    @Autowired
    private UserService userService;

    public Boolean InvoicingExists(Long id) {
        Optional<InvoicingModel> invoicing = invoicingRepository.findById(id);
        return invoicing.isPresent();
    }

    public List<InvoicingModel> getAllInvoices() {
        return invoicingRepository.findAll();
    }

    @Transactional
    public ResponseEntity<?> saveInvoicing(InvoicingRequestDto invoicing) {
        try {
            Optional<BusinessUnitModel> businessUnitOptional = businessUnitsRepository
                    .findById(invoicing.getBusinessUnitId());

            if (!businessUnitOptional.isPresent()) {
                return ResponseEntity.status(HttpStatus.OK).body("No se encontró la sucursal");
            }

            BusinessUnitModel businessUnit = businessUnitOptional.get();

            // Lista de productos
            List<InvoicingProductRequestDto> products = invoicing.getProducts();

            // Verificar disponibilidad de stock para todos los productos
            for (InvoicingProductRequestDto productInvoicing : products) {
                Optional<BusinessUnitInventoryModel> productOptional = inventoryRepository
                        .findInventoryProductByProductId(productInvoicing.getId(), invoicing.getBusinessUnitId());

                if (!productOptional.isPresent()) {
                    return ResponseEntity.status(HttpStatus.OK).body("No se encontró el producto");
                }

                BusinessUnitInventoryModel product = productOptional.get();
                if (product.getQuantity() < productInvoicing.getQuantity()) {
                    return ResponseEntity.status(HttpStatus.OK)
                            .body("No hay suficiente cantidad en stock para el producto: "
                                    + product.getProduct().getName());
                }
            }

            // Creamos la nueva factura después de confirmar que todos los productos tienen
            // stock suficiente
            InvoicingModel newInvoicing = new InvoicingModel();
            newInvoicing.setTotal(invoicing.getTotal());
            newInvoicing.setClient(invoicing.getClient());
            newInvoicing.setNumber(invoicing.getNumber());
            newInvoicing.setSeller(userService.getCurrentUser());
            newInvoicing.setCreatedAt(LocalDate.now());
            newInvoicing.setDniOrCuil(invoicing.getDniOrCuil());
            newInvoicing.setBusinessUnit(businessUnit);
            newInvoicing.setSaleCondition(invoicing.getSaleCondition());

            // Guardamos la factura
            InvoicingModel savedInvoice = invoicingRepository.save(newInvoicing);

            // Registrar los productos en la factura y actualizar el inventario
            for (InvoicingProductRequestDto productInvoicing : products) {
                BusinessUnitInventoryModel product = inventoryRepository
                        .findInventoryProductByProductId(productInvoicing.getId(), invoicing.getBusinessUnitId())
                        .get();

                InvoicingProductModel invoicingProductModel = new InvoicingProductModel();
                invoicingProductModel.setInvoicing(savedInvoice);
                invoicingProductModel.setProduct(product.getProduct());
                invoicingProductModel.setQuantity(productInvoicing.getQuantity());
                invoicingProductRepository.save(invoicingProductModel);

                // Actualizar el stock del producto
                product.setQuantity(product.getQuantity() - productInvoicing.getQuantity());
                inventoryRepository.save(product);
            }

            return ResponseEntity.status(HttpStatus.OK).body("Factura guardada correctamente");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Ocurrió un error");
        }
    }

    public Optional<InvoicingModel> getInvoiceById(Long id) {
        return invoicingRepository.findById(id);
    }

    public List<InvoicingModel> getByUnit(Long id) {
        return invoicingRepository.findByBusinessUnitId(id);
    }

    @Modifying
    @Transactional
    public ResponseEntity<?> deleteInvoiceById(Long invoiceId) {
        try {
            List<InvoicingProductModel> invoiceProducts = invoicingProductRepository.findAllInvoiceProduct(invoiceId);

            /* Recorremos los productos de la factura */
            for (InvoicingProductModel productInvoicing : invoiceProducts) {
                Long productInvoicingId = productInvoicing.getProduct().getId();
                Long unitId = productInvoicing.getInvoicing().getBusinessUnit().getId();

                /* Buscamos los productos de la factura en el inventario de la sucursal */
                Optional<BusinessUnitInventoryModel> productOptional = inventoryRepository
                        .findInventoryProductByProductId(productInvoicingId, unitId);

                /* Si no encuentra el producto en el inventario de la sucursal */
                if (!productOptional.isPresent()) {

                    /* Buscamos el producto global */
                    Optional<ProductModel> globalProduct = productRepository.findById(productInvoicingId);

                    /* Si no encuentra el producto global continuamos con el siguiente producto */
                    if (!globalProduct.isPresent())
                        continue;

                    /* Actualizamos el stock del producto global */
                    ProductModel product = globalProduct.get();
                    product.setQuantity(product.getQuantity() + productInvoicing.getQuantity());
                    productRepository.save(product);
                } else {
                    /* Caso contrario actualizamos el stock en el inventario de la sucursal */
                    BusinessUnitInventoryModel product = productOptional.get();
                    product.setQuantity(product.getQuantity() + productInvoicing.getQuantity());
                    inventoryRepository.save(product);
                }
            }

            /* Borramos la factura */
            invoicingRepository.deleteById(invoiceId);
            return ResponseEntity.status(HttpStatus.OK).body("Factura eliminada correctamente");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("Ocurrió un error");
        }
    }
}
