package gestini.modules.product.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.PathVariable;

import gestini.modules.product.models.ProductModel;

@Repository
public interface ProductRepository extends JpaRepository<ProductModel, Long> {
    @Query("SELECT product FROM ProductModel product WHERE product.deposit.id = :depositId")
    List<ProductModel> findProductsByDepositId(@Param("depositId") Long depositId);

    @Query("SELECT product FROM ProductModel product WHERE product.category.id = :categoryId")
    List<ProductModel> findByCategoryId(@PathVariable("categoryId") Long categoryId);

    List<ProductModel> findByName(String name);

    @Query("SELECT product FROM ProductModel product JOIN product.deposit deposit WHERE LOWER(product.name) LIKE LOWER(CONCAT('%', :name, '%')) AND deposit.id = :depositId")
    List<ProductModel> findByNameAndDepositId(@Param("name") String name, @Param("depositId") Long depositId);

    List<ProductModel> findByReferenceCode(String referenceCode);
}
