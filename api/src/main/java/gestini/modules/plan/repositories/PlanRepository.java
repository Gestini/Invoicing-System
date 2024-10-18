package gestini.modules.plan.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import gestini.modules.plan.models.PlanModel;

@Repository
public interface PlanRepository extends JpaRepository<PlanModel, Long> {
}
