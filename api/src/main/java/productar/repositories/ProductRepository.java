package productar.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import productar.models.ProductModel;

@Repository
public interface ProductRepository extends JpaRepository<ProductModel, Long> {
    List<ProductModel> findByBusinessUnitId(Long businessUnitId);

    List<ProductModel> findByCategory(String category);

    List<ProductModel> findByName(String name);

    @Query("SELECT product FROM ProductModel product JOIN product.businessUnit businessUnit WHERE LOWER(product.name) LIKE LOWER(CONCAT('%', :name, '%')) AND businessUnit.id = :businessUnitId")
    List<ProductModel> findByNameAndBusinessUnitId(@Param("name") String name, @Param("businessUnitId") Long businessUnitId);

    List<ProductModel> findByReferenceCode(String referenceCode);
}
