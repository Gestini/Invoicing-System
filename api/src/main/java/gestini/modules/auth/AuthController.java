package gestini.modules.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import gestini.modules.auth.dto.LoginRequestDto;
import gestini.modules.auth.dto.RegisterRequestDto;
import gestini.modules.user.dto.PasswordResetRequestDto;
import gestini.modules.user.dto.PasswordResetTokenRequestDto;
import gestini.modules.user.models.User;
import gestini.modules.user.services.PasswordResetService;
import gestini.utils.EmailSender;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor

public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private PasswordResetService passwordResetService;

    @Autowired
    private EmailSender emailSender;

    @PostMapping("/login")
    public ResponseEntity<String> login(@Valid @RequestBody LoginRequestDto request) {
        return authService.login(request);
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@Valid @RequestBody RegisterRequestDto request) {
        return authService.register(request);
    }

    @GetMapping("/load-user-by-token/{token}")
    public User loadUserByUsername(@PathVariable("token") String token) {
        return authService.loadUserByToken(token);
    }

    @PostMapping("/request-password-reset")
    public ResponseEntity<String> requestPasswordReset(@Valid @RequestBody PasswordResetRequestDto request) {
        String token = passwordResetService.createPasswordResetToken(request.getEmail());

        String subject = "Password Reset Request";
        String message = "To reset your password, use the following token: " + token;

        emailSender.sendEmail(request.getEmail(), subject, message);
        return ResponseEntity.ok("Password reset email sent");
    }

    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestBody PasswordResetTokenRequestDto request) {
        if (!passwordResetService.validatePasswordResetToken(request.getToken())) {
            return ResponseEntity.badRequest().body("Invalid or expired token");
        }
        authService.updatePassword(request.getToken(), request.getNewPassword());
        return ResponseEntity.ok("Password reset successfully");
    }

}