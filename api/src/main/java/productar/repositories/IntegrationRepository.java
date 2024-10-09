package productar.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import productar.models.IntegrationModel;

@Repository
public interface IntegrationRepository extends JpaRepository<IntegrationModel, Long> {
    // Métodos de consulta específicos si es necesario
}