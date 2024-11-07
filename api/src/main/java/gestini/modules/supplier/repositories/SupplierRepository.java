package gestini.modules.supplier.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.PathVariable;

import gestini.modules.supplier.models.SupplierModel;

@Repository
public interface SupplierRepository extends JpaRepository<SupplierModel, Long> {
    List<SupplierModel> findByNameContainingIgnoreCase(String name);

    List<SupplierModel> findByBusinessUnitId(Long businessUnitId);

    @Query("SELECT supplier FROM SupplierModel supplier WHERE LOWER(supplier.name) LIKE LOWER(CONCAT('%', :searchValue, '%')) AND supplier.businessUnit.id = :unitId")
    List<SupplierModel> searchSupplierByName(@PathVariable("unitId") Long unitId,
            @PathVariable("searchValue") String searchValue);
}
