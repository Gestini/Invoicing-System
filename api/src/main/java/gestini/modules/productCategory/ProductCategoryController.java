package gestini.modules.productCategory;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import gestini.annotations.CheckPermissions;
import gestini.modules.productCategory.dto.ProductCategoryDto;
import gestini.modules.productCategory.models.ProductCategoryModel;
import gestini.utils.Permission;
import gestini.utils.UnitContext;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.security.SecurityRequirements;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/category")
@SecurityRequirements({
        @SecurityRequirement(name = "BearerAuth"),
        @SecurityRequirement(name = "UnitAccess")
})
@CheckPermissions(Permission.MANAGE_STOCK)
public class ProductCategoryController {

    @Autowired
    private ProductCategoryService productCategoryService;

    @PostMapping("/create")
    public ResponseEntity<?> createProductCategory(@Valid @RequestBody ProductCategoryDto body) {
        return productCategoryService.createProductCategory(UnitContext.getUnitId(), body);
    }

    @PatchMapping("/edit/{productCategoryId}")
    public ResponseEntity<?> editProductCategory(@PathVariable Long productCategoryId,
            @Valid @RequestBody ProductCategoryDto body) {
        return productCategoryService.editProductCategory(productCategoryId, body);
    }

    @GetMapping("/find-all")
    public List<ProductCategoryModel> findAllProductCategoriesFromUnit() {
        return productCategoryService.findAllProductCategoriesFromUnit(UnitContext.getUnitId());
    }

    @GetMapping("/search-by-name")
    public List<ProductCategoryModel> searchProductCategory(@RequestParam("name") String name) {
        return productCategoryService.searchProductCategory(UnitContext.getUnitId(), name);
    }

    @DeleteMapping("/delete-by-id/{productCategoryId}")
    public ResponseEntity<?> deleteProductCategoryById(@PathVariable("productCategoryId") Long productCategoryId) {
        return productCategoryService.deleteProductCategoryById(productCategoryId);
    }

}
