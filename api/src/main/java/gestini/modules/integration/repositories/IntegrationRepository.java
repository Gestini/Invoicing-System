package gestini.modules.integration.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import gestini.modules.integration.models.IntegrationModel;

@Repository
public interface IntegrationRepository extends JpaRepository<IntegrationModel, Long> {
}