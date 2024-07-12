package productar.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import productar.models.DepositUnitsModel;

@Repository
public interface DepositUnitsRepository extends JpaRepository<DepositUnitsModel, Long> {
    List<DepositUnitsModel> findByOwnerUsername(String username);
}