package productar.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import productar.dto.LoginRequest;
import productar.dto.PasswordResetRequest;
import productar.dto.PasswordResetTokenRequest;
import productar.dto.RegisterRequest;
import productar.models.User;
import productar.services.AuthService;
import productar.services.EmailSenderService;
import productar.services.PasswordResetService;

@RestController
@RequestMapping("/auth/")
@RequiredArgsConstructor

public class AuthController {

    private final AuthService authService;
    private final PasswordResetService passwordResetService;
    private final EmailSenderService emailSenderService;

    @PostMapping(value = "login")
    public ResponseEntity<String> login(@RequestBody LoginRequest request) {
        return authService.login(request);
    }

    @PostMapping(value = "register")
    public ResponseEntity<String> register(@RequestBody RegisterRequest request) {
        return authService.register(request);
    }

    @GetMapping(value = "load-user-by-token/{token}")
    public User loadUserByUsername(@PathVariable("token") String token) {
        return authService.loadUserByToken(token);
    }

    @PostMapping("request-password-reset")
    public ResponseEntity<String> requestPasswordReset(@RequestBody PasswordResetRequest request) {
        String token = passwordResetService.createPasswordResetToken(request.getEmail());
        emailSenderService.sendPasswordResetTokenEmail(request.getEmail(), token);
        return ResponseEntity.ok("Password reset email sent");
    }

    @PostMapping("reset-password")
    public ResponseEntity<String> resetPassword(@RequestBody PasswordResetTokenRequest request) {
        if (!passwordResetService.validatePasswordResetToken(request.getToken())) {
            return ResponseEntity.badRequest().body("Invalid or expired token");
        }
        authService.updatePassword(request.getToken(), request.getNewPassword());
        return ResponseEntity.ok("Password reset successfully");
    }

}