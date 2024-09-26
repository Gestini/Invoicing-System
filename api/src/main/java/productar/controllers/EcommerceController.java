package productar.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import productar.models.EcommerceModel;
import productar.services.EcommerceService;

@RestController
@RequestMapping("/ecommerce")
public class EcommerceController {

    @Autowired
    private EcommerceService ecommerceService;

    @PostMapping("/create")
    ResponseEntity<?> createEcommerce(@RequestBody EcommerceModel newEcommerce) {
        return ecommerceService.createEcommerce(newEcommerce);
    }

}