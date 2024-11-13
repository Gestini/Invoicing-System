package gestini.modules.invoicing;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import gestini.modules.businessUnit.models.BusinessUnitModel;
import gestini.modules.businessUnit.repositories.BusinessUnitsRepository;
import gestini.modules.discount.models.DiscountModel;
import gestini.modules.discount.repositories.DiscountRepository;
import gestini.modules.inventory.models.BusinessUnitInventoryModel;
import gestini.modules.inventory.repositories.InventoryRepository;
import gestini.modules.invoicing.dto.InvoicingDto;
import gestini.modules.invoicing.dto.InvoicingProductDto;
import gestini.modules.invoicing.dto.InvoicingProductRequestDto;
import gestini.modules.invoicing.dto.InvoicingRequestDto;
import gestini.modules.invoicing.models.InvoicingModel;
import gestini.modules.invoicing.models.InvoicingProductModel;
import gestini.modules.invoicing.repositories.InvoicingProductRepository;
import gestini.modules.invoicing.repositories.InvoicingRepository;
import gestini.modules.product.models.ProductModel;
import gestini.modules.product.repositories.ProductRepository;
import gestini.modules.user.UserService;
import jakarta.transaction.Transactional;

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
    private DiscountRepository discountRepository;

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
    public ResponseEntity<?> saveInvoicing(InvoicingRequestDto invoicing, Long unitId) {
        try {
            Optional<BusinessUnitModel> businessUnitOptional = businessUnitsRepository.findById(unitId);

            if (!businessUnitOptional.isPresent()) {
                return ResponseEntity.status(HttpStatus.OK).body("No se encontró la sucursal");
            }

            BusinessUnitModel businessUnit = businessUnitOptional.get();

            // Manejar el descuento
            DiscountModel discount = null;
            String discountCode = invoicing.getDiscountCode();
            if (discountCode != null) {
                Optional<DiscountModel> discountOptional = discountRepository.findDiscountByCode(discountCode);
                if (!discountOptional.isPresent()) {
                    return ResponseEntity.status(HttpStatus.OK).body("Descuento no encontrado");
                }
                DiscountModel discountExists = discountOptional.get();
                if (discountExists.getBusinessUnit().getId() != unitId) {
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                            .body("El descuento no pertenece a la sucursal");
                }
                discount = discountExists;
            }

            // Verificar disponibilidad de stock
            List<InvoicingProductRequestDto> products = invoicing.getProducts();
            List<BusinessUnitInventoryModel> updatedInventories = new ArrayList<>();
            List<InvoicingProductModel> invoicingProducts = new ArrayList<>();

            for (InvoicingProductRequestDto productInvoicing : products) {
                Optional<BusinessUnitInventoryModel> productOptional = inventoryRepository
                        .findInventoryProductByProductId(productInvoicing.getId(), unitId);

                if (!productOptional.isPresent()) {
                    return ResponseEntity.status(HttpStatus.OK).body("No se encontró el producto");
                }

                BusinessUnitInventoryModel product = productOptional.get();
                if (product.getQuantity() < productInvoicing.getQuantity()) {
                    return ResponseEntity.status(HttpStatus.OK)
                            .body("No hay suficiente cantidad en stock para el producto: "
                                    + product.getProduct().getName());
                }

                // Crear y añadir a la lista de productos de la factura
                InvoicingProductModel invoicingProductModel = new InvoicingProductModel();
                invoicingProductModel.setInvoicing(null); // Se establecerá después de guardar la factura
                invoicingProductModel.setProduct(product.getProduct());
                invoicingProductModel.setQuantity(productInvoicing.getQuantity());
                invoicingProducts.add(invoicingProductModel);

                // Actualizar inventario y añadir a la lista de inventarios actualizados
                product.setQuantity(product.getQuantity() - productInvoicing.getQuantity());
                updatedInventories.add(product);
            }

            // Crear y guardar la nueva factura
            InvoicingModel newInvoicing = new InvoicingModel();
            newInvoicing.setTotal(invoicing.getTotal());
            newInvoicing.setClient(invoicing.getClient());
            newInvoicing.setNumber(invoicing.getNumber());
            newInvoicing.setSeller(userService.getCurrentUser());
            newInvoicing.setDiscount(discount);
            newInvoicing.setCreatedAt(LocalDate.now());
            newInvoicing.setDniOrCuil(invoicing.getDniOrCuil());
            newInvoicing.setBusinessUnit(businessUnit);
            newInvoicing.setSaleCondition(invoicing.getSaleCondition());

            InvoicingModel savedInvoice = invoicingRepository.save(newInvoicing);

            // Asociar la factura a los productos y guardar en batch
            for (InvoicingProductModel invoicingProduct : invoicingProducts) {
                invoicingProduct.setInvoicing(savedInvoice);
            }
            invoicingProductRepository.saveAll(invoicingProducts);

            // Guardar los inventarios actualizados en batch
            inventoryRepository.saveAll(updatedInventories);

            return ResponseEntity.status(HttpStatus.OK).body("Factura guardada correctamente");
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Ocurrió un error");
        }
    }

    public Optional<InvoicingModel> getInvoiceById(Long id) {
        return invoicingRepository.findById(id);
    }

    public List<InvoicingDto> getByUnit(Long id) {
        List<InvoicingModel> invoices = invoicingRepository.findByBusinessUnitId(id);
        return invoices.stream()
                .map(this::mapToInvoicingDto)
                .collect(Collectors.toList());
    }

    public List<InvoicingProductDto> findInvoiceProductByInvoiceId(Long invoiceId) {
        List<InvoicingProductModel> invoiceProducs = invoicingProductRepository
                .findInvoiceProductByInvoiceId(invoiceId);
        return invoiceProducs.stream()
                .map(this::mapToInvoicingProductDto)
                .collect(Collectors.toList());
    }

    @Modifying
    @Transactional
    public ResponseEntity<?> deleteInvoiceById(Long invoiceId) {
        try {
            List<InvoicingProductModel> invoiceProducts = invoicingProductRepository
                    .findInvoiceProductByInvoiceId(invoiceId);

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

    private InvoicingDto mapToInvoicingDto(InvoicingModel invoicing) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        String createdAt = invoicing.getCreatedAt().format(formatter);
        String discountCode = (invoicing.getDiscount() != null) ? invoicing.getDiscount().getCode() : null;

        return new InvoicingDto(
                invoicing.getId(),
                invoicing.getTotal(),
                invoicing.getSeller().getUsername(),
                createdAt,
                discountCode);
    }

    private InvoicingProductDto mapToInvoicingProductDto(InvoicingProductModel invoicingProduct) {
        return new InvoicingProductDto(
                invoicingProduct.getProduct().getId(),
                invoicingProduct.getQuantity(),
                invoicingProduct.getProduct().getName(),
                invoicingProduct.getProduct().getPrice());
    }

}
