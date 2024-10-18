package gestini.modules.user.services;

import java.time.LocalDateTime;
import java.util.UUID;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import gestini.modules.user.models.PasswordResetToken;
import gestini.modules.user.models.User;
import gestini.modules.user.repositories.PasswordResetTokenRepository;
import gestini.modules.user.repositories.UserRepository;

@Service
@RequiredArgsConstructor
public class PasswordResetService {

    private final PasswordResetTokenRepository passwordResetTokenRepository;
    private final UserRepository userRepository;

    public String createPasswordResetToken(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("No user found with email: " + email));

        String token = UUID.randomUUID().toString();
        PasswordResetToken passwordResetToken = new PasswordResetToken();
        passwordResetToken.setToken(token);
        passwordResetToken.setExpiryDate(LocalDateTime.now().plusHours(1));
        passwordResetToken.setUser(user);

        passwordResetTokenRepository.save(passwordResetToken);
        return token;
    }

    public boolean validatePasswordResetToken(String token) {
        return passwordResetTokenRepository.findByToken(token)
                .filter(passwordResetToken -> passwordResetToken.getExpiryDate().isAfter(LocalDateTime.now()))
                .isPresent();
    }

    public void resetPassword(String token, String newPassword) {
        PasswordResetToken passwordResetToken = passwordResetTokenRepository.findByToken(token)
                .orElseThrow(() -> new IllegalArgumentException("Invalid token"));

        User user = passwordResetToken.getUser();
        user.setPassword(newPassword); // Ensure this password is encoded
        userRepository.save(user);

        passwordResetTokenRepository.delete(passwordResetToken);
    }
}
