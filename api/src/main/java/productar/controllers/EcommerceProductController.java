package productar.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import productar.models.EcommerceProductModel;
import productar.services.EcommerceProductService;

@RestController
@RequestMapping("/ecommerce-product")
public class EcommerceProductController {

    @Autowired
    private EcommerceProductService ecommerceProductService;

    @PostMapping("/save")
    ResponseEntity<?> createEcommerceProduct(@RequestBody EcommerceProductModel newProduct) {
        return ecommerceProductService.saveEcommerceProduct(newProduct);
    }

    @PostMapping("/delete/{epId}")
    ResponseEntity<?> deleteEcommerceProduct(@PathVariable("epId") Long epId) {
        return ecommerceProductService.deleteEcommerceProduct(epId);
    }

}