package productar.services;

import productar.models.ProductModel;
import productar.repositories.ProductRepository;

import java.lang.reflect.Field;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.persistence.EntityNotFoundException;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public ProductModel createProduct(ProductModel product) {
        return productRepository.save(product);
    }

    public ProductModel updateProduct(ProductModel updatedProduct) {
        // Buscar el producto existente por su ID
        Optional<ProductModel> existingProductOptional = productRepository.findById(updatedProduct.getId());

        if (existingProductOptional.isPresent()) {
            ProductModel existingProduct = existingProductOptional.get();

            // Copiar los campos no nulos de updatedProduct a existingProduct
            copyNonNullProperties(updatedProduct, existingProduct);

            // Guardar el producto actualizado
            return productRepository.save(existingProduct);
        } else {
            throw new EntityNotFoundException("No se encontró el producto con ID: " + updatedProduct.getId());
        }
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

    public void deleteProduct(Long productId) {
        productRepository.deleteById(productId);
    }

    public ProductModel getProductById(Long productId) {
        return productRepository.findById(productId).orElse(null);
    }

    public List<ProductModel> getAllProducts() {
        return productRepository.findAll();
    }

    public List<ProductModel> getProductsByBusinessUnit(Long businessUnitId) {
        return productRepository.findByBusinessUnitId(businessUnitId);
    }

    // Método para obtener productos por categoría
    public List<ProductModel> getProductsByCategory(String category) {
        return productRepository.findByCategory(category);
    }

    // Método para obtener productos por nombre
    public List<ProductModel> getProductsByName(String name) {
        return productRepository.findByName(name);
    }

    // Método para obtener productos por código de referencia
    public List<ProductModel> getProductsByReferenceCode(String referenceCode) {
        return productRepository.findByReferenceCode(referenceCode);
    }

    public void deleteProductsByBusinessUnit(Long businessUnitId) {
        List<ProductModel> products = productRepository.findByBusinessUnitId(businessUnitId);
        products.forEach(product -> productRepository.deleteById(product.getId()));
    }
}
