package gestini.modules.product;

import java.lang.reflect.Field;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import gestini.modules.deposit.models.DepositModel;
import gestini.modules.deposit.repositories.DepositRepository;
import gestini.modules.product.models.ProductModel;
import gestini.modules.product.repositories.ProductRepository;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private DepositRepository depositRepository;

    public ResponseEntity<?> createProduct(ProductModel product) {
        try {
            ProductModel newProduct = productRepository.save(product);
            return ResponseEntity.ok(newProduct);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("Ocurrió un error");
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

    public List<ProductModel> getProductsByCategory(String category) {
        return productRepository.findByCategory(category);
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
