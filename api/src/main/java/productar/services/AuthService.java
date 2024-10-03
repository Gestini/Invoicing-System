package productar.services;

import java.util.Optional;
import java.util.regex.Pattern;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
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
    private final ValidateFields validateFields;
    private final PasswordResetService passwordResetService;

    public ResponseEntity<String> login(LoginRequest request) {
        try {
            String password = request.getPassword();
            String username = request.getUsername();

            String fields[] = { password, username };

            if (!validateFields.Validate(fields)) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Entrada de datos no válida");
            }

            Optional<User> userOptional = userRepository.findByUsername(username);
            if (!userOptional.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuario no encontrado");
            }

            User user = userOptional.get();

            if (!passwordEncoder.matches(password, user.getPassword())) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Contraseña incorrecta");
            }

            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));

            String token = jwtService.getToken(user);
            return ResponseEntity.status(HttpStatus.OK).body(token);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Ocurrió un error: " + e.getMessage());
        }
    }

    public ResponseEntity<String> register(RegisterRequest request) {
        try {
            // Validación de campos y verificación de contraseñas
            if (!validateEmail(request.getEmail())) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("Por favor, ingresa un correo electrónico válido.");
            }

            if (!validateUsername(request.getUsername())) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("El username solo puede contener letras, números y guiones bajos (_).");
            }

            String passwordError = validatePassword(request.getPassword());
            if (passwordError != null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(passwordError);
            }

            if (!request.getPassword().equals(request.getRepeatPassword())) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("Las contraseñas no coinciden. Por favor, verifica y vuelve a intentarlo.");
            }

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

    // Métodos de validación
    private boolean validateEmail(String email) {
        // Expresión regular para validar el formato de email
        String regex = "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$";
        return Pattern.compile(regex).matcher(email).matches();
    }

    private boolean validateUsername(String username) {
        // Verificar longitud y caracteres permitidos en el username
        String regex = "^[a-zA-Z0-9_]+$";
        return username.length() >= 3 && username.length() <= 20 && Pattern.compile(regex).matcher(username).matches();
    }

    private String validatePassword(String password) {
        // Verificar longitud y patrón de la contraseña
        if (password.length() < 8) {
            return "La contraseña debe tener al menos 8 caracteres.";
        }
        
        if (password.length() > 20) {
            return "La contraseña no puede tener más de 20 caracteres.";
        }

        String regex = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[\\W_])[A-Za-z\\d\\W_]{8,}$";
        if (!Pattern.compile(regex).matcher(password).matches()) {
            return "La contraseña debe incluir una mayúscula, un número y un carácter especial.";
        }

        return null;
    }

    public void updatePassword(String token, String newPassword) {
        String encodedPassword = passwordEncoder.encode(newPassword);
        passwordResetService.resetPassword(token, encodedPassword);
    }
}