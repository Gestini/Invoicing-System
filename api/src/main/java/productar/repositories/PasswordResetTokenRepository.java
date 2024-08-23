package productar.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import productar.models.PasswordResetToken;

import java.util.Optional;

public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, Long> {
    Optional<PasswordResetToken> findByToken(String token);
}
