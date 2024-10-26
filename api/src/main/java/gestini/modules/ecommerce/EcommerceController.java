package gestini.modules.ecommerce;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import gestini.annotations.CheckPermissions;
import gestini.modules.ecommerce.models.EcommerceCategoryModel;
import gestini.modules.ecommerce.models.EcommerceModel;
import gestini.modules.ecommerce.models.EcommerceProductModel;
import gestini.utils.Permission;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.security.SecurityRequirements;

@RestController
@RequestMapping("/ecommerce")
@SecurityRequirements({
        @SecurityRequirement(name = "BearerAuth"),
        @SecurityRequirement(name = "UnitAccess")
})
@CheckPermissions(Permission.MANAGE_ECOMMERCE)
public class EcommerceController {

    @Autowired
    private EcommerceService ecommerceService;

    @PostMapping("/create")
    ResponseEntity<?> createEcommerce(@RequestBody EcommerceModel newEcommerce) {
        return ecommerceService.createEcommerce(newEcommerce);
    }

    @PostMapping("/category/create")
    ResponseEntity<?> createEcommerceCategory(@RequestBody EcommerceCategoryModel newEcommerceCategory) {
        return ecommerceService.createEcommerceCategory(newEcommerceCategory);
    }

    @DeleteMapping("/category/delete/{ecId}")
    ResponseEntity<?> deleteEcommerceCategory(@PathVariable("ecId") Long ecId) {
        return ecommerceService.deleteEcommerceCategory(ecId);
    }

    @PostMapping("/product/save")
    ResponseEntity<?> createEcommerceProduct(@RequestBody EcommerceProductModel newProduct) {
        return ecommerceService.saveEcommerceProduct(newProduct);
    }

    @DeleteMapping("/product/delete/{epId}")
    ResponseEntity<?> deleteEcommerceProduct(@PathVariable("epId") Long epId) {
        return ecommerceService.deleteEcommerceProduct(epId);
    }

}