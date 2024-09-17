package productar.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import productar.models.ProductModel;

@Repository
public interface ProductRepository extends JpaRepository<ProductModel, Long> {
    @Query("SELECT product FROM ProductModel product WHERE product.depositUnit.id = :depositId")
    List<ProductModel> findProductsByDepositId(@Param("depositId") Long depositId);

    List<ProductModel> findByCategory(String category);

    List<ProductModel> findByName(String name);

    @Query("SELECT product FROM ProductModel product JOIN product.depositUnit depositUnit WHERE LOWER(product.name) LIKE LOWER(CONCAT('%', :name, '%')) AND depositUnit.id = :depositId")
    List<ProductModel> findByNameAndDepositId(@Param("name") String name, @Param("depositId") Long depositId);

    List<ProductModel> findByReferenceCode(String referenceCode);

    List<ProductModel> findByDepositUnitId(Long depositUnitId);

}
