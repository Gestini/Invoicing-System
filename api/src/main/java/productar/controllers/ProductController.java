package productar.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import productar.dto.ProductResponseDTO;
import productar.models.ProductModel;
import productar.services.ProductService;

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

    @PutMapping("/edit/{id}")
    public ResponseEntity<?> updateProduct(@PathVariable("id") Long id, @RequestBody ProductModel newProductData) {
        return productService.updateProduct(id, newProductData);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable("id") Long id) {
        return productService.deleteProduct(id);
    }

    @GetMapping("/by-business-unit/{depositId}")
    public ResponseEntity<List<ProductResponseDTO>> findProductsByDepositId(
            @PathVariable("depositId") Long depositId) {
        List<ProductResponseDTO> products = productService.findProductsByDepositId(depositId);
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

    @GetMapping("/search/{name}/{id}")
    public ResponseEntity<List<ProductModel>> findByNameAndDepositId(@PathVariable("name") String name,
            @PathVariable("id") Long id) {
        List<ProductModel> products = productService.findByNameAndDepositId(name, id);
        return ResponseEntity.ok(products);
    }

    @GetMapping("/by-reference-code/{referenceCode}")
    public ResponseEntity<List<ProductModel>> getProductsByReferenceCode(
            @PathVariable("referenceCode") String referenceCode) {
        List<ProductModel> products = productService.getProductsByReferenceCode(referenceCode);
        return ResponseEntity.ok(products);
    }

    @GetMapping("/depositunit/{depositUnitId}")
    public ResponseEntity<List<ProductResponseDTO>> getProductsByDepositUnit(@PathVariable Long depositUnitId) {
        List<ProductResponseDTO> products = productService.getProductsByDepositUnit(depositUnitId);
        return new ResponseEntity<>(products, HttpStatus.OK);
    }
}
