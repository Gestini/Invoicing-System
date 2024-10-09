package productar.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import productar.models.BusinessUnitInvitationModel;

public interface InvitationRepository extends JpaRepository<BusinessUnitInvitationModel, Long> {
    Optional<BusinessUnitInvitationModel> findByToken(String token);

    @Query("SELECT i FROM BusinessUnitInvitationModel i JOIN i.employee e WHERE e.email = :email")
    Optional<BusinessUnitInvitationModel> findByInviteeEmail(@Param("email") Long email);
}
