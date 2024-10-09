package productar.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import productar.models.EcommerceCategoryModel;
import productar.services.EcommerceCategoryService;

@RestController
@RequestMapping("/ecommerce-category")
public class EcommerceCategoryController {

    @Autowired
    private EcommerceCategoryService ecommerceCategoryService;

    @PostMapping("/create")
    ResponseEntity<?> createEcommerceCategory(@RequestBody EcommerceCategoryModel newEcommerceCategory) {
        return ecommerceCategoryService.createEcommerceCategory(newEcommerceCategory);
    }

    @PostMapping("/delete/{ecId}")
    ResponseEntity<?> deleteEcommerceProduct(@PathVariable("ecId") Long ecId) {
        return ecommerceCategoryService.deleteEcommerceCategory(ecId);
    }

}