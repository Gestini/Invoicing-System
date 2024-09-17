package productar.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import productar.models.IntegrationModel;

public interface IntegrationRepository extends JpaRepository<IntegrationModel, Long> {
}
