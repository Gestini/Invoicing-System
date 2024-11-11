package gestini.modules.businessUnit.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import gestini.modules.businessUnit.models.BusinessUnitModel;

@Repository
public interface BusinessUnitsRepository extends JpaRepository<BusinessUnitModel, Long> {
    @Query("SELECT unit FROM BusinessUnitModel unit WHERE unit.company.owner.username = :username")
    List<BusinessUnitModel> findByOwnerUsername(String username);

    @Query("SELECT unit FROM BusinessUnitModel unit " +
            "LEFT JOIN EmployeeModel e ON e.businessUnit = unit " +
            "WHERE (unit.company.owner.id = :userId OR e.user.id = :userId AND e.status = ACTIVE) " +
            "AND unit.company.id = :companyId")
    List<BusinessUnitModel> findBusinessUnitsByCompanyIdAndWithUserAsOwnerOrEmployee(Long companyId, Long userId);

    @Query("SELECT unit FROM BusinessUnitModel unit WHERE unit.company.id = :companyId")
    List<BusinessUnitModel> findUnitsByCompanyId(Long companyId);

    @Query("SELECT unit FROM BusinessUnitModel unit WHERE unit.ecommerce = true")
    List<BusinessUnitModel> findAllUnitsWithEcommerce();

    @Query("SELECT unit FROM BusinessUnitModel unit WHERE unit.id = :unitId AND unit.ecommerce = true")
    BusinessUnitModel findByUnitIdAndEcommerce(Long unitId);

    @Query("SELECT bu FROM BusinessUnitModel bu WHERE bu.company.id = :companyId AND bu.id NOT IN (SELECT bud.businessUnit.id FROM BusinessUnitDepositModel bud WHERE bud.deposit.id = :depositId)")
    List<BusinessUnitModel> getUnitsMissingDeposit(Long companyId, Long depositId);

    @Query("SELECT bud.businessUnit FROM BusinessUnitDepositModel bud WHERE bud.businessUnit.company.id = :companyId AND bud.deposit.id = :depositId")
    List<BusinessUnitModel> getUnitsWithDeposit(Long companyId, Long depositId);

    @Query("SELECT bu FROM BusinessUnitModel bu WHERE bu.company.id = :companyId AND bu.id NOT IN (SELECT bud.businessUnit.id FROM BusinessUnitDepositModel bud WHERE bud.deposit.id = :depositId) AND LOWER(bu.name) LIKE LOWER(CONCAT('%', :searchValue, '%'))")
    List<BusinessUnitModel> searchUnitsMissingDeposit(Long companyId, Long depositId, String searchValue);
}
