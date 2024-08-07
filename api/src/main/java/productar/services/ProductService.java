package productar.services;

import productar.dto.ProductResponseDTO;
import productar.models.ProductModel;
import productar.repositories.ProductRepository;

import java.lang.reflect.Field;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

    public ResponseEntity<String> deleteProduct(Long productId) {
        try {
            productRepository.deleteById(productId);
            return ResponseEntity.status(HttpStatus.OK).body("Producto eliminado correctamente");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("Ocurrió un error al eliminar el producto");
        }
    }

    public ProductModel getProductById(Long productId) {
        return productRepository.findById(productId).orElse(null);
    }

    public List<ProductModel> getAllProducts() {
        return productRepository.findAll();
    }

    public List<ProductResponseDTO> getProductsByBusinessUnit(Long businessUnitId) {
        List<ProductModel> products = productRepository.findByBusinessUnitId(businessUnitId);
        return products.stream()
                .map(this::convertToResponseDTO)
                .collect(Collectors.toList());
    }

    private ProductResponseDTO convertToResponseDTO(ProductModel product) {
        ProductResponseDTO dto = new ProductResponseDTO();
        // Copiar los campos de ProductModel a ProductResponseDTO
        dto.setId(product.getId());
        dto.setCodigo1(product.getCodigo1());
        dto.setCodigo2(product.getCodigo2());
        dto.setBarcode(product.getBarcode());
        dto.setImage(product.getImage());
        dto.setPrice(product.getPrice());
        dto.setCardPrice(product.getCardPrice());
        dto.setFinancedPrice(product.getFinancedPrice());
        dto.setFriendPrice(product.getFriendPrice());
        dto.setPurchasePrice(product.getPurchasePrice());
        dto.setPriceCalculation(product.getPriceCalculation());
        dto.setCostPrice(product.getCostPrice());
        dto.setQuantity(product.getQuantity());
        dto.setCategory(product.getCategory());
        dto.setName(product.getName());
        dto.setDescription(product.getDescription());
        dto.setCreatedAt(product.getCreatedAt());
        dto.setUpdatedAt(product.getUpdatedAt());
        dto.setStatus(product.getStatus());
        dto.setPricePolicy(product.getPricePolicy());
        dto.setNet1(product.getNet1());
        dto.setNet2(product.getNet2());
        dto.setNet3(product.getNet3());
        dto.setNet4(product.getNet4());
        dto.setTaxType(product.getTaxType());
        dto.setReferenceCode(product.getReferenceCode());
        dto.setPackageProduct(product.getPackageProduct());
        dto.setQuantityPerPackage(product.getQuantityPerPackage());
        dto.setBusinessUnitId(product.getBusinessUnit().getId());
        dto.setDepositUnitId(product.getDepositUnit().getId());
        dto.setSupplierUnitId(product.getSupplierUnit().getId());

        return dto;
    }

    // Método para obtener productos por categoría
    public List<ProductModel> getProductsByCategory(String category) {
        return productRepository.findByCategory(category);
    }

    // Método para obtener productos por nombre
    public List<ProductModel> getProductsByName(String name) {
        return productRepository.findByName(name);
    }

    // Método para obtener productos por nombre
    public List<ProductModel> findByNameAndBusinessUnitId(String name, Long id) {
        return productRepository.findByNameAndBusinessUnitId(name, id);
    }

    // Método para obtener productos por código de referencia
    public List<ProductModel> getProductsByReferenceCode(String referenceCode) {
        return productRepository.findByReferenceCode(referenceCode);
    }

    public void deleteProductsByBusinessUnit(Long businessUnitId) {
        List<ProductModel> products = productRepository.findByBusinessUnitId(businessUnitId);
        products.forEach(product -> productRepository.deleteById(product.getId()));
    }

    public List<ProductResponseDTO> getProductsByDepositUnit(Long depositUnitId) {
        List<ProductModel> products = productRepository.findByDepositUnitId(depositUnitId);
        return products.stream()
                .map(this::convertToResponseDTO)
                .collect(Collectors.toList());
    }
}
