package productar.services;

import productar.models.ProductModel;
import productar.repositories.ProductRepository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public ProductModel createProduct(ProductModel product) {
        return productRepository.save(product);
    }

    public ProductModel updateProduct(ProductModel product) {
        return productRepository.save(product);
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

    // Añade otros métodos según sea necesario, por ejemplo, búsqueda por categoría,
    // etc.
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
}
