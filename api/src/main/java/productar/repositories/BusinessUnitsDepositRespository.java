package productar.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.web.bind.annotation.PathVariable;

import productar.models.BusinessUnitDepositModel;

public interface BusinessUnitsDepositRespository extends JpaRepository<BusinessUnitDepositModel, Long> {
    @Query("SELECT deposit FROM BusinessUnitDepositModel deposit WHERE deposit.businessUnit.id = :unitId")
    List<BusinessUnitDepositModel> getDepositsByUnitId(@PathVariable("unitId") Long unitId);

    @Query("SELECT COUNT(bd) > 0 FROM BusinessUnitDepositModel bd WHERE bd.businessUnit.id = :unitId AND bd.deposit.id = :depositId")
    boolean isAssigned(@PathVariable("unitId") Long unitId, @PathVariable("depositId") Long depositId);
}