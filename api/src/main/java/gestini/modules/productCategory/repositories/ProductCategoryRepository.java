package gestini.modules.productCategory.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.PathVariable;

import gestini.modules.productCategory.models.ProductCategoryModel;

@Repository
public interface ProductCategoryRepository extends JpaRepository<ProductCategoryModel, Long> {

    @Query("SELECT productCategory FROM ProductCategoryModel productCategory WHERE LOWER(productCategory.name) LIKE LOWER(CONCAT('%', :searchValue, '%')) AND productCategory.businessUnit.id = :unitId")
    List<ProductCategoryModel> searchProductCategory(@PathVariable("unitId") Long unitId,
            @PathVariable("searchValue") String searchValue);

    @Query("SELECT productCategory FROM ProductCategoryModel productCategory WHERE productCategory.businessUnit.id = :unitId")
    List<ProductCategoryModel> findAllProductCategoriesFromUnit(@PathVariable("unitId") Long unitId);
}