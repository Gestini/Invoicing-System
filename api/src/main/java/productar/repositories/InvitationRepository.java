package productar.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import productar.models.InvitationModel;

public interface InvitationRepository extends JpaRepository<InvitationModel, Long> {
    Optional<InvitationModel> findByToken(String token);

    @Query("SELECT i FROM InvitationModel i JOIN i.employee e WHERE e.email = :email")
    Optional<InvitationModel> findByInviteeEmail(@Param("email") Long email);
}
