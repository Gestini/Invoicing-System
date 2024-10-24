package gestini.modules.product;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import gestini.modules.product.models.ProductModel;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;

@RestController
@RequestMapping("/product")
@SecurityRequirement(name = "BearerAuth")
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping
    public List<ProductModel> getAllProducts() {
        return productService.getAllProducts();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getProductById(@PathVariable("id") Long id) {
        return productService.getProductById(id);
    }

    @PostMapping
    public ResponseEntity<?> createProduct(@Valid @RequestBody ProductModel product) {
        return productService.createProduct(product);
    }

    @PutMapping("/edit/{id}")
    public ResponseEntity<?> updateProduct(@PathVariable("id") Long id, @RequestBody ProductModel newProductData) {
        return productService.updateProduct(id, newProductData);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable("id") Long id) {
        return productService.deleteProduct(id);
    }

    @GetMapping("/get-by-deposit-id/{depositId}")
    public ResponseEntity<?> findProductsByDepositId(@PathVariable("depositId") Long depositId) {
        return productService.findProductsByDepositId(depositId);
    }

    @GetMapping("/by-category/{category}")
    public List<ProductModel> getProductsByCategory(@PathVariable("category") String category) {
        return productService.getProductsByCategory(category);
    }

    @GetMapping("/by-name/{name}")
    public List<ProductModel> getProductsByName(@PathVariable("name") String name) {
        return productService.getProductsByName(name);
    }

    @GetMapping("/search/{name}/{depositId}")
    public ResponseEntity<?> findByNameAndDepositId(@PathVariable("name") String name,
            @PathVariable("depositId") Long depositId) {
        return productService.findByNameAndDepositId(name, depositId);
    }

    @GetMapping("/by-reference-code/{refCode}")
    public List<ProductModel> getProductsByRefCode(@PathVariable("refCode") String refCode) {
        return productService.getProductsByRefCode(refCode);
    }
}
