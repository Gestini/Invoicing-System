package gestini.modules.businessUnit.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import gestini.modules.deposit.models.BusinessUnitDepositModel;
import jakarta.transaction.Transactional;

public interface BusinessUnitsDepositRespository extends JpaRepository<BusinessUnitDepositModel, Long> {
    @Query("SELECT deposit FROM BusinessUnitDepositModel deposit WHERE deposit.businessUnit.id = :unitId")
    List<BusinessUnitDepositModel> getDepositsByUnitId(Long unitId);

    @Query("SELECT COUNT(bd) > 0 FROM BusinessUnitDepositModel bd WHERE bd.businessUnit.id = :unitId AND bd.deposit.id = :depositId")
    boolean isAssigned(Long unitId, Long depositId);

    @Modifying
    @Transactional
    @Query("DELETE FROM BusinessUnitDepositModel bd WHERE bd.businessUnit.id = :unitId AND bd.deposit.id = :depositId")
    int unlinkDepositFromUnit(Long unitId, Long depositId);
}
