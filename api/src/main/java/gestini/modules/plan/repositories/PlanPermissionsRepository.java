package gestini.modules.plan.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import gestini.modules.plan.models.PlanPermissionsModel;

@Repository
public interface PlanPermissionsRepository extends JpaRepository<PlanPermissionsModel, Long> {
}
