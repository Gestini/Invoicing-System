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

        @Query("SELECT unit FROM BusinessUnitModel unit " +
                        "LEFT JOIN EmployeeModel e ON e.businessUnit = unit " +
                        "WHERE unit.company.id = :companyId AND " +
                        "(unit.company.owner.id = :userId) OR (e.user.id = :userId AND e.status = ACTIVE)")
        List<BusinessUnitModel> findBusinessUnitsByCompanyIdAndWithUserAsOwnerOrEmployee(@PathVariable("companyId") Long companyId,
                        @PathVariable("userId") Long userId);

        @Query("SELECT unit FROM BusinessUnitModel unit WHERE unit.company.id = :companyId")
        List<BusinessUnitModel> findUnitsByCompanyId(@PathVariable("companyId") Long companyId);

        @Query("SELECT unit FROM BusinessUnitModel unit WHERE unit.ecommerce = true")
        List<BusinessUnitModel> findAllUnitsWithEcommerce();

        @Query("SELECT unit FROM BusinessUnitModel unit WHERE unit.id = :unitId AND unit.ecommerce = true")
        BusinessUnitModel findByUnitIdAndEcommerce(@PathVariable("unitId") Long unitId);

        @Query("SELECT bu FROM BusinessUnitModel bu WHERE bu.company.id = :companyId AND bu.id NOT IN (SELECT bud.businessUnit.id FROM BusinessUnitDepositModel bud WHERE bud.deposit.id = :depositId)")
        List<BusinessUnitModel> getUnitsMissingDeposit(@PathVariable("companyId") Long companyId,
                        @PathVariable("depositId") Long depositId);

        @Query("SELECT bud.businessUnit FROM BusinessUnitDepositModel bud WHERE bud.businessUnit.company.id = :companyId AND bud.deposit.id = :depositId")
        List<BusinessUnitModel> getUnitsWithDeposit(@PathVariable("companyId") Long companyId,
                        @PathVariable("depositId") Long depositId);

        @Query("SELECT bu FROM BusinessUnitModel bu WHERE bu.company.id = :companyId AND bu.id NOT IN (SELECT bud.businessUnit.id FROM BusinessUnitDepositModel bud WHERE bud.deposit.id = :depositId) AND LOWER(bu.name) LIKE LOWER(CONCAT('%', :searchValue, '%'))")
        List<BusinessUnitModel> searchUnitsMissingDeposit(@PathVariable("companyId") Long companyId,
                        @PathVariable("depositId") Long depositId, @PathVariable("searchValue") String searchValue);

}
