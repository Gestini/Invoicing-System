package productar.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.PathVariable;

import productar.models.BusinessUnitModel;

@Repository
public interface BusinessUnitsRepository extends JpaRepository<BusinessUnitModel, Long> {
    @Query("SELECT unit FROM BusinessUnitModel unit WHERE unit.company.owner.username = :username")
    List<BusinessUnitModel> findByOwnerUsername(@PathVariable("username") String username);

    @Query("SELECT unit FROM BusinessUnitModel unit WHERE unit.company.id = :companyId")
    List<BusinessUnitModel> findUnitsByCompanyId(@PathVariable("companyId") Long companyId);

    @Query("SELECT unit FROM BusinessUnitModel unit WHERE unit.ecommerce = true")
    List<BusinessUnitModel> findAllUnitsWithEcommerce();

    @Query("SELECT unit FROM BusinessUnitModel unit WHERE unit.id = :unitId AND unit.ecommerce = true")
    BusinessUnitModel findByUnitIdAndEcommerce(@PathVariable("unitId") Long unitId);

    @Query(value = "SELECT * FROM business_unit WHERE company_id = :companyId LIMIT 1", nativeQuery = true)
    BusinessUnitModel findFirstByCompanyId(@PathVariable("companyId") Long companyId);

}
