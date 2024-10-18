package gestini.modules.user.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import gestini.modules.user.models.PasswordResetToken;

import java.util.Optional;

public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, Long> {
    Optional<PasswordResetToken> findByToken(String token);
}
