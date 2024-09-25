package productar.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import productar.models.EcommerceCategoryModel;
import productar.repositories.EcommerceCategoryRespository;

@Service
public class EcommerceCategoryService {
    @Autowired
    private EcommerceCategoryRespository ecommerceCategoryRespository;

    public ResponseEntity<?> createEcommerceCategory(EcommerceCategoryModel newEcommerceCategory) {
        try {
            ecommerceCategoryRespository.save(newEcommerceCategory);
            return ResponseEntity.ok("Categoría del ecommerce creada correctamente");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Ocurrió un error");
        }
    }

    public ResponseEntity<?> deleteEcommerceCategory(Long ecId) {
        try {
            ecommerceCategoryRespository.deleteById(ecId);
            return ResponseEntity.ok("Categoría eliminada correctamente del ecommerce");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Ocurrió un error");
        }
    }

}
