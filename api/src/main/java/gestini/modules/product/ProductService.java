package gestini.modules.product;

import java.lang.reflect.Field;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import gestini.modules.deposit.models.DepositModel;
import gestini.modules.deposit.repositories.DepositRepository;
import gestini.modules.product.dto.ProductDto;
import gestini.modules.product.dto.SaveProductsDto;
import gestini.modules.product.models.ProductModel;
import gestini.modules.product.repositories.ProductRepository;
import gestini.modules.productCategory.models.ProductCategoryModel;
import gestini.modules.productCategory.repositories.ProductCategoryRepository;
import gestini.modules.supplier.models.SupplierModel;
import gestini.modules.supplier.repositories.SupplierRepository;
import jakarta.transaction.Transactional;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private DepositRepository depositRepository;

    @Autowired
    private ProductCategoryRepository productCategoryRepository;

    @Autowired
    private SupplierRepository supplierRepository;

    public ResponseEntity<?> createProduct(ProductDto productDto) {
        try {
            /* Buscar el depósito */
            Optional<DepositModel> depositOptional = depositRepository.findById(productDto.getDepositId());

            if (!depositOptional.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Depósito no encontrado");
            }

            DepositModel deposit = depositOptional.get();

            /* Buscar la categoría del producto */
            ProductCategoryModel productCategory = null;
            if (productDto.getCategoryId() != null) {
                Optional<ProductCategoryModel> productCategoryOptional = productCategoryRepository
                        .findById(productDto.getCategoryId());

                if (!productCategoryOptional.isPresent()) {
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Categoría no encontrado");
                }

                productCategory = productCategoryOptional.get();
            }

            /* Buscar al proveedor del producto */
            SupplierModel productSupplier = null;
            if (productDto.getSupplierId() != null) {
                Optional<SupplierModel> productSupplierOptional = supplierRepository
                        .findById(productDto.getSupplierId());

                if (!productSupplierOptional.isPresent()) {
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Categoría no encontrado");
                }

                productSupplier = productSupplierOptional.get();
            }

            ProductModel product = new ProductModel();

            product.setNet1(productDto.getNet1());
            product.setNet2(productDto.getNet2());
            product.setNet3(productDto.getNet3());
            product.setNet4(productDto.getNet4());
            product.setName(productDto.getName());
            product.setImage(productDto.getImage());
            product.setPrice(productDto.getPrice());
            product.setStatus(productDto.getStatus());
            product.setTaxType(productDto.getTaxType());
            product.setBarcode(productDto.getBarcode());
            product.setCodigo2(productDto.getCodigo2());
            product.setCodigo1(productDto.getCodigo1());
            product.setDeposit(deposit);
            product.setCategory(productCategory);
            product.setQuantity(productDto.getQuantity());
            product.setCardPrice(productDto.getCardPrice());
            product.setCostPrice(productDto.getCostPrice());
            product.setDescription(productDto.getDescription());
            product.setFriendPrice(productDto.getFriendPrice());
            product.setPricePolicy(productDto.getPricePolicy());
            product.setSupplierUnit(productSupplier);
            product.setPurchasePrice(productDto.getPurchasePrice());
            product.setFinancedPrice(productDto.getFinancedPrice());
            product.setReferenceCode(productDto.getReferenceCode());
            product.setPackageProduct(productDto.getPackageProduct());
            product.setPriceCalculation(productDto.getPriceCalculation());
            product.setQuantityPerPackage(productDto.getQuantityPerPackage());

            ProductModel newProduct = productRepository.save(product);
            return ResponseEntity.ok(newProduct);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Ocurrió un error");
        }
    }

    @Transactional
    public ResponseEntity<?> saveProducts(SaveProductsDto body, Long depositId) {
        try {
            /* Buscar el depósito */
            Optional<DepositModel> depositOptional = depositRepository.findById(depositId);

            if (!depositOptional.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Depósito no encontrado");
            }

            /* Obtiene el depósito */
            DepositModel deposit = depositOptional.get();

            /* Obtener la lista de productos */
            List<ProductModel> products = body.getProducts();

            /* Obtener todos los IDs de productos a guardar */
            List<Long> productIds = products.stream()
                    .map(ProductModel::getId)
                    .collect(Collectors.toList());

            /* Recuperar productos existentes */
            List<ProductModel> existingProducts = productRepository.findAllById(productIds);
            Map<Long, ProductModel> existingProductsMap = existingProducts.stream()
                    .collect(Collectors.toMap(ProductModel::getId, product -> product));

            /* Recorrer los productos */
            for (ProductModel product : products) {
                if (existingProductsMap.containsKey(product.getId())) {
                    /* Actualiza la cantidad si el producto ya existe */
                    ProductModel productFound = existingProductsMap.get(product.getId());
                    productFound.setQuantity(product.getQuantity() + productFound.getQuantity());
                    productRepository.save(productFound);
                } else {
                    /* Guardar nuevo producto */
                    product.setDeposit(deposit);
                    productRepository.save(product);
                }
            }

            return ResponseEntity.ok("Productos guardados correctamente");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Ocurrió un error");
        }
    }

    public ResponseEntity<?> updateProduct(Long id, ProductModel updatedProduct) {
        try {
            Optional<ProductModel> productOptional = productRepository.findById(id);

            if (!productOptional.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Producto no encontrado");
            }

            ProductModel existingProduct = productOptional.get();
            copyNonNullProperties(updatedProduct, existingProduct);
            productRepository.save(existingProduct);

            return ResponseEntity.ok("Producto actualizado correctamente");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("Ocurrió un error");
        }
    }

    public ResponseEntity<String> deleteProduct(Long productId) {
        try {
            productRepository.deleteById(productId);
            return ResponseEntity.status(HttpStatus.OK).body("Producto eliminado correctamente");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("Ocurrió un error al eliminar el producto");
        }
    }

    public ResponseEntity<?> getProductById(Long productId) {
        try {
            Optional<ProductModel> product = productRepository.findById(productId);
            if (!product.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Producto no encontrado");
            }

            return ResponseEntity.ok(product);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Ocurrió un error");
        }
    }

    public List<ProductModel> getAllProducts() {
        return productRepository.findAll();
    }

    public ResponseEntity<?> findProductsByDepositId(Long depositId) {
        try {
            Optional<DepositModel> deposit = depositRepository.findById(depositId);

            if (!deposit.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Depósito no encontrado");
            }

            List<ProductModel> products = productRepository.findProductsByDepositId(depositId);
            return ResponseEntity.ok(products);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Ocurrió un error");
        }
    }

    public List<ProductModel> getProductsByCategoryId(Long categoryId) {
        return productRepository.findByCategoryId(categoryId);
    }

    public List<ProductModel> getProductsByName(String name) {
        return productRepository.findByName(name);
    }

    public ResponseEntity<?> findByNameAndDepositId(String name, Long depositId) {
        try {
            Optional<DepositModel> deposit = depositRepository.findById(depositId);

            if (!deposit.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Depósito no encontrado");
            }

            List<ProductModel> products = productRepository.findByNameAndDepositId(name, depositId);
            return ResponseEntity.ok(products);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Ocurrió un error");
        }
    }

    public List<ProductModel> getProductsByRefCode(String referenceCode) {
        return productRepository.findByReferenceCode(referenceCode);
    }

    private void copyNonNullProperties(ProductModel source, ProductModel target) {
        // Obtener todos los campos de la clase ProductModel
        Field[] fields = ProductModel.class.getDeclaredFields();

        // Iterar sobre los campos
        for (Field field : fields) {
            try {
                // Hacer accesible el campo para poder leer y escribir
                field.setAccessible(true);

                // Obtener el valor del campo en source
                Object value = field.get(source);

                // Si el valor no es nulo, establecerlo en target
                if (value != null) {
                    field.set(target, value);
                }
            } catch (IllegalAccessException e) {
                e.printStackTrace();
            }
        }
    }
}
