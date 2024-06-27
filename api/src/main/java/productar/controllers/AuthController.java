package productar.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import productar.dto.AuthResponse;
import productar.dto.LoginRequest;
import productar.dto.RegisterRequest;
import productar.models.User;
import productar.services.AuthService;

@RestController
@RequestMapping("/auth/")
@RequiredArgsConstructor

public class AuthController {

    private final AuthService authService;

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

}
