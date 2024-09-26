package productar.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import productar.models.EcommerceModel;
import productar.repositories.EcommerceRepository;

@Service
public class EcommerceService {
    @Autowired
    private EcommerceRepository ecommerceRepository;

    public ResponseEntity<?> createEcommerce(EcommerceModel newEcommerce) {
        try {
            ecommerceRepository.save(newEcommerce);
            return ResponseEntity.ok("Ecommerce creado correctamente");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Ocurrió un error");
        }
    }

}
