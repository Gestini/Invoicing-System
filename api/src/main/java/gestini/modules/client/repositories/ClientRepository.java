package gestini.modules.client.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import gestini.modules.client.models.ClientModel;

@Repository
public interface ClientRepository extends JpaRepository<ClientModel, Long> {
    List<ClientModel> findByNameContainingIgnoreCase(String name);

    List<ClientModel> findByBusinessUnitId(Long businessUnitId);
}
