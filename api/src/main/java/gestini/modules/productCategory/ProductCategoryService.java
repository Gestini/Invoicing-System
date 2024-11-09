package gestini.modules.productCategory;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import gestini.modules.businessUnit.models.BusinessUnitModel;
import gestini.modules.businessUnit.repositories.BusinessUnitsRepository;
import gestini.modules.productCategory.dto.ProductCategoryDto;
import gestini.modules.productCategory.models.ProductCategoryModel;
import gestini.modules.productCategory.repositories.ProductCategoryRepository;

@Service
public class ProductCategoryService {

    @Autowired
    private ProductCategoryRepository productCategoryRepository;

    @Autowired
    private BusinessUnitsRepository businessUnitsRepository;

    public ResponseEntity<?> createProductCategory(Long unitId, ProductCategoryDto body) {
        try {
            Optional<BusinessUnitModel> optionalUnit = businessUnitsRepository.findById(unitId);
            if (!optionalUnit.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Unidad no encontrada");
            }

            BusinessUnitModel unit = optionalUnit.get();

            ProductCategoryModel productCategory = new ProductCategoryModel();
            productCategory.setBusinessUnit(unit);
            productCategory.setName(body.getName());

            ProductCategoryModel savedPorductCategory = productCategoryRepository.save(productCategory);

            return ResponseEntity.ok(savedPorductCategory);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Ocurrió un error");
        }
    }

    public ResponseEntity<?> editProductCategory(Long productCategoryId, ProductCategoryDto body) {
        try {
            Optional<ProductCategoryModel> productCategoryOptional = productCategoryRepository
                    .findById(productCategoryId);
            if (!productCategoryOptional.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Categoría de producto no encontrado");
            }

            ProductCategoryModel productCategory = productCategoryOptional.get();

            if (body.getName() != null) {
                productCategory.setName(body.getName());
            }

            ProductCategoryModel savedDiscount = productCategoryRepository.save(productCategory);
            return ResponseEntity.ok(savedDiscount);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Ocurrió un error");
        }
    }

    public ResponseEntity<?> deleteProductCategoryById(Long productCategoryId) {
        try {
            productCategoryRepository.deleteById(productCategoryId);
            return ResponseEntity.ok("Categoría de producto eliminada correctamente");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Ocurrió un error");
        }
    }

    public List<ProductCategoryModel> searchProductCategory(Long unitId, String searchValue) {
        return productCategoryRepository.searchProductCategory(unitId, searchValue);
    }

    public List<ProductCategoryModel> findAllProductCategoriesFromUnit(Long unitId) {
        return productCategoryRepository.findAllProductCategoriesFromUnit(unitId);
    }

}
