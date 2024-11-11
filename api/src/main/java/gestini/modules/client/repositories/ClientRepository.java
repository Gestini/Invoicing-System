package gestini.modules.client.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import gestini.modules.client.models.ClientModel;

@Repository
public interface ClientRepository extends JpaRepository<ClientModel, Long> {
    @Query("SELECT client FROM ClientModel client WHERE client.businessUnit.id = :unitId")
    List<ClientModel> findClientsByUnitId(Long unitId);
}
