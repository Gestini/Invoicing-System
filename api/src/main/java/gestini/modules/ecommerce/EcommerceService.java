package gestini.modules.ecommerce;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import gestini.modules.ecommerce.models.EcommerceCategoryModel;
import gestini.modules.ecommerce.models.EcommerceModel;
import gestini.modules.ecommerce.models.EcommerceProductModel;
import gestini.modules.ecommerce.repositories.EcommerceCategoryRespository;
import gestini.modules.ecommerce.repositories.EcommerceProductRepository;
import gestini.modules.ecommerce.repositories.EcommerceRepository;

@Service
public class EcommerceService {
    @Autowired
    private EcommerceRepository ecommerceRepository;

    @Autowired
    private EcommerceCategoryRespository ecommerceCategoryRespository;

    @Autowired
    private EcommerceProductRepository ecommerceProductRepository;

    public ResponseEntity<?> createEcommerce(EcommerceModel newEcommerce) {
        try {
            ecommerceRepository.save(newEcommerce);
            return ResponseEntity.ok("Ecommerce creado correctamente");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Ocurrió un error");
        }
    }

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
