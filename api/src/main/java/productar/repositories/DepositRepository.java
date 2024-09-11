package productar.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import productar.models.DepositModel;

@Repository
public interface DepositRepository extends JpaRepository<DepositModel, Long> {
}