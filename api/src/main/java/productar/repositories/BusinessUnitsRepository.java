package productar.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.PathVariable;

import productar.models.BusinessUnitModel;

@Repository
public interface BusinessUnitsRepository extends JpaRepository<BusinessUnitModel, Long> {
    List<BusinessUnitModel> findByOwnerUsername(String username);

    @Query("SELECT unit FROM BusinessUnitModel unit WHERE unit.ecommerce = true")
    List<BusinessUnitModel> findAllUnitsWithEcommerce();

    @Query("SELECT unit FROM BusinessUnitModel unit WHERE unit.id = :unitId AND unit.ecommerce = true")
    BusinessUnitModel findByUnitIdAndEcommerce(@PathVariable("unitId") Long unitId);
}
