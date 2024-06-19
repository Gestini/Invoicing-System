package productar.services;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import productar.dto.AuthResponse;
import productar.dto.LoginRequest;
import productar.dto.RegisterRequest;

@Service
@RequiredArgsConstructor

public class AuthService {

    public AuthResponse login(LoginRequest request) {
        throw new UnsupportedOperationException("Unimplemented method 'login'");
    }

    public AuthResponse register(RegisterRequest request) {
        throw new UnsupportedOperationException("Unimplemented method 'register'");
    }

}
