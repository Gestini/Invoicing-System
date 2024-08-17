package productar.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import productar.models.InvitationModel;

public interface InvitationRepository extends JpaRepository<InvitationModel, Long> {
    Optional<InvitationModel> findByToken(String token);

    Optional<InvitationModel> findByInviteeEmail(String email);
}
