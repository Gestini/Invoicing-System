package gestini.modules.inventory.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import gestini.modules.inventory.models.BusinessUnitInventoryModel;

@Repository
public interface InventoryRepository extends JpaRepository<BusinessUnitInventoryModel, Long> {

    @Query("SELECT inventory FROM BusinessUnitInventoryModel inventory WHERE inventory.product.id = :productId AND inventory.businessUnit.id = :unitId")
    Optional<BusinessUnitInventoryModel> findInventoryProductByProductId(Long productId, Long unitId);

    @Query("SELECT inventory FROM BusinessUnitInventoryModel inventory WHERE inventory.businessUnit.id = :unitId")
    List<BusinessUnitInventoryModel> findInventoryByUnitId(Long unitId);

    @Query("SELECT inventory FROM BusinessUnitInventoryModel inventory WHERE inventory.businessUnit.id = :unitId AND LOWER(inventory.product.name) LIKE LOWER(CONCAT('%', :name, '%')) ")
    List<BusinessUnitInventoryModel> searchInventoryProductByNameAndUnit(Long unitId, String name);
}