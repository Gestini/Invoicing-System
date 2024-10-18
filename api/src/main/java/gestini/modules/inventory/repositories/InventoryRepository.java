package gestini.modules.inventory.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.PathVariable;

import gestini.modules.inventory.models.BusinessUnitInventoryModel;

@Repository
public interface InventoryRepository extends JpaRepository<BusinessUnitInventoryModel, Long> {

    @Query("SELECT inventory FROM BusinessUnitInventoryModel inventory WHERE inventory.product.id = :productId AND inventory.businessUnit.id = :unitId")
    Optional<BusinessUnitInventoryModel> findInventoryProductByProductId(@PathVariable("productId") Long productId,
            @PathVariable("unitId") Long unitId);

    @Query("SELECT inventory FROM BusinessUnitInventoryModel inventory WHERE inventory.businessUnit.id = :unitId")
    List<BusinessUnitInventoryModel> findInventoryByUnitId(@PathVariable("unitId") Long unitId);

    @Query("SELECT inventory FROM BusinessUnitInventoryModel inventory WHERE inventory.businessUnit.id = :unitId AND LOWER(inventory.product.name) LIKE LOWER(CONCAT('%', :name, '%')) ")
    List<BusinessUnitInventoryModel> searchProductByNameAndUnit(@PathVariable("unitId") Long unitId,
            @PathVariable("name") String name);
}