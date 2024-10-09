package productar.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.PathVariable;

import productar.models.DepositModel;

@Repository
public interface DepositRepository extends JpaRepository<DepositModel, Long> {

    @Query("SELECT deposit FROM DepositModel deposit WHERE deposit.company.id = :companyId")
    List<DepositModel> findDepositsByCompanyId(@PathVariable Long companyId);
}