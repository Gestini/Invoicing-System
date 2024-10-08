package productar.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import productar.dto.InvoicingProductRequestDTO;
import productar.dto.InvoicingRequestDTO;
import productar.models.BusinessUnitInventoryModel;
import productar.models.BusinessUnitModel;
import productar.models.InvoicingModel;
import productar.models.InvoicingProductModel;
import productar.models.ProductModel;
import productar.repositories.BusinessUnitInventoryRepository;
import productar.repositories.BusinessUnitsRepository;
import productar.repositories.InvoicingProductRepository;
import productar.repositories.InvoicingRepository;
import productar.repositories.ProductRepository;

@Service
public class InvoicingService {

    @Autowired
    private InvoicingRepository invoicingRepository;

    @Autowired
    private BusinessUnitsRepository businessUnitsRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private BusinessUnitInventoryRepository inventoryRepository;

    @Autowired
    private InvoicingProductRepository invoicingProductRepository;

    public Boolean InvoicingExists(Long id) {
        Optional<InvoicingModel> invoicing = invoicingRepository.findById(id);
        return invoicing.isPresent();
    }

    public List<InvoicingModel> getAllInvoices() {
        return invoicingRepository.findAll();
    }

    @Transactional
    public ResponseEntity<?> saveInvoicing(InvoicingRequestDTO invoicing) {
        try {
            Optional<BusinessUnitModel> businessUnitOptinal = businessUnitsRepository
                    .findById(invoicing.getBusinessUnitId());

            if (!businessUnitOptinal.isPresent()) {
                return ResponseEntity.status(HttpStatus.OK).body("No se encontró la sucursal");
            }

            BusinessUnitModel businessUnit = businessUnitOptinal.get();

            /* Creamos la nueva factura */
            InvoicingModel newInvoicing = new InvoicingModel();
            newInvoicing.setTotal(invoicing.getTotal());
            newInvoicing.setClient(invoicing.getClient());
            newInvoicing.setNumber(invoicing.getNumber());
            newInvoicing.setSeller(invoicing.getSeller());
            newInvoicing.setDniOrCuil(invoicing.getDniOrCuil());
            newInvoicing.setBusinessUnit(businessUnit);
            newInvoicing.setSaleCondition(invoicing.getSaleCondition());

            /* Guardamos la factura */
            InvoicingModel savedInvoice = invoicingRepository.save(newInvoicing);

            /* Lista de productos */
            List<InvoicingProductRequestDTO> products = invoicing.getProducts();

            /* Recorremos la lista de productos */
            for (InvoicingProductRequestDTO productInvoicing : products) {

                /* Buscamos el producto por su id en el inventario de la sucursal */
                Optional<BusinessUnitInventoryModel> productOptional = inventoryRepository
                        .findInventoryProductByProductId(productInvoicing.getId(), invoicing.getBusinessUnitId());
                if (!productOptional.isPresent()) {
                    return ResponseEntity.status(HttpStatus.OK).body("No se encontró el producto");
                }

                /* Verificamos si el stock es suficiente para realizar la factura */
                BusinessUnitInventoryModel product = productOptional.get();
                if (product.getQuantity() < productInvoicing.getQuantity()) {
                    return ResponseEntity.status(HttpStatus.OK).body("No hay suficiente cantidad en stock");
                }

                /* Creamos los productos de la factura */
                InvoicingProductModel invoicingProductModel = new InvoicingProductModel();
                invoicingProductModel.setInvoicing(savedInvoice);
                invoicingProductModel.setProduct(product.getProduct());
                invoicingProductModel.setQuantity(productInvoicing.getQuantity());
                invoicingProductRepository.save(invoicingProductModel);

                /* Actualizamos el stock del producto en el inventario de la sucursal */
                product.setQuantity(product.getQuantity() - productInvoicing.getQuantity());
                inventoryRepository.save(product);
            }

            return ResponseEntity.status(HttpStatus.OK).body("Factura guardada correctamente");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Ocurrió un error: " + e.getMessage());
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
