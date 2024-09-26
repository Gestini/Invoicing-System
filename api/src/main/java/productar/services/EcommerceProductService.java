package productar.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import productar.models.EcommerceProductModel;
import productar.repositories.EcommerceProductRepository;

@Service
public class EcommerceProductService {
    @Autowired
    private EcommerceProductRepository ecommerceProductRepository;

    public ResponseEntity<?> saveEcommerceProduct(EcommerceProductModel newProduct) {
        try {
            ecommerceProductRepository.save(newProduct);
            return ResponseEntity.ok("Producto guardado correctamente en el ecommerce");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Ocurrió un error");
        }
    }

    public ResponseEntity<?> deleteEcommerceProduct(Long epId) {
        try {
            ecommerceProductRepository.deleteById(epId);
            return ResponseEntity.ok("Producto eliminado correctamente del ecommerce");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Ocurrió un error");
        }
    }

}
