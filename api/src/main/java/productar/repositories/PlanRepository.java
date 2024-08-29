package productar.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import productar.models.PlanModel;

@Repository
public interface PlanRepository extends JpaRepository<PlanModel, Long> {
}
