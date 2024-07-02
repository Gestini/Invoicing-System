package productar.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import productar.models.ProductModel;
import productar.services.ProductService;

import java.util.List;

@RestController
@RequestMapping("/products")
public class ProductController {

    private final ProductService productService;

    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public ResponseEntity<List<ProductModel>> getAllProducts() {
        List<ProductModel> products = productService.getAllProducts();
        return ResponseEntity.ok(products);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductModel> getProductById(@PathVariable("id") Long id) {
        ProductModel product = productService.getProductById(id);
        if (product != null) {
            return ResponseEntity.ok(product);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<ProductModel> createProduct(@RequestBody ProductModel product) {
        ProductModel createdProduct = productService.createProduct(product);
        return new ResponseEntity<>(createdProduct, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductModel> updateProduct(@PathVariable("id") Long id, @RequestBody ProductModel product) {
        // Asignar el ID recibido en la URL al objeto product
        product.setId(id);

        ProductModel updatedProduct = productService.updateProduct(product);
        return ResponseEntity.ok(updatedProduct);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable("id") Long id) {
        productService.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/by-business-unit/{businessUnitId}")
    public ResponseEntity<List<ProductModel>> getProductsByBusinessUnit(
            @PathVariable("businessUnitId") Long businessUnitId) {
        List<ProductModel> products = productService.getProductsByBusinessUnit(businessUnitId);
        return ResponseEntity.ok(products);
    }

    @GetMapping("/by-category/{category}")
    public ResponseEntity<List<ProductModel>> getProductsByCategory(@PathVariable("category") String category) {
        List<ProductModel> products = productService.getProductsByCategory(category);
        return ResponseEntity.ok(products);
    }

    @GetMapping("/by-name/{name}")
    public ResponseEntity<List<ProductModel>> getProductsByName(@PathVariable("name") String name) {
        List<ProductModel> products = productService.getProductsByName(name);
        return ResponseEntity.ok(products);
    }

    @GetMapping("/by-reference-code/{referenceCode}")
    public ResponseEntity<List<ProductModel>> getProductsByReferenceCode(
            @PathVariable("referenceCode") String referenceCode) {
        List<ProductModel> products = productService.getProductsByReferenceCode(referenceCode);
        return ResponseEntity.ok(products);
    }
}
