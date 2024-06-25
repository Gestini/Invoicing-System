package productar.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import productar.models.SupplierModel;

@Repository
public interface SupplierRepository extends JpaRepository<SupplierModel, Long> {
    List<SupplierModel> findByNameContainingIgnoreCase(String name);

    List<SupplierModel> findByBusinessUnitId(Long businessUnitId);

}
