package productar.services;

import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import productar.dto.LoginRequest;
import productar.dto.RegisterRequest;
import productar.models.Role;
import productar.models.User;
import productar.repositories.UserRepository;
import productar.utils.ValidateFields;

@Service
@RequiredArgsConstructor

public class AuthService {
    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    public final ValidateFields validateFields;

    public ResponseEntity<String> login(LoginRequest request) {
        String password = request.getPassword();
        String username = request.getUsername();

        String fields[] = { password, username };

        if (!validateFields.Validate(fields)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Entrada de datos no válida");
        }

        authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(),
                        request.getPassword()));

        UserDetails user = userRepository.findByUsername(request.getUsername()).orElseThrow();

        String token = jwtService.getToken(user);
        return ResponseEntity.status(HttpStatus.OK).body(token);

    }

    public ResponseEntity<String> register(RegisterRequest request) {
        try {
            // Validación de campos y verificación de contraseñas

            // Verificar si el usuario ya existe por nombre de usuario
            Optional<User> existingUser = userRepository.findByUsername(request.getUsername());
            if (existingUser.isPresent()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("El nombre de usuario ya está en uso");
            }

            // Verificar si el usuario ya existe por correo electrónico
            existingUser = userRepository.findByEmail(request.getEmail());
            if (existingUser.isPresent()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("El correo electrónico ya está registrado");
            }

            // Crear el nuevo usuario y guardarlo
            User user = User.builder()
                    .username(request.getUsername())
                    .password(passwordEncoder.encode(request.getPassword()))
                    .firtsname(request.getFirstname())
                    .lastname(request.getLastname())
                    .country(request.getCountry())
                    .email(request.getEmail())
                    .role(Role.USER)
                    .build();

            userRepository.save(user);

            return ResponseEntity.status(HttpStatus.OK).body("Usuario registrado correctamente");

        } catch (Exception e) {
            System.out.println(e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Ocurrió un error al registrar el usuario");
        }
    }

    public User loadUserByToken(String token) {
        String username = jwtService.getUsernameFromToken(token);
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        return user;
    }

}
