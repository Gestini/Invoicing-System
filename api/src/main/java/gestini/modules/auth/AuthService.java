package gestini.modules.auth;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import gestini.modules.auth.dto.LoginRequestDto;
import gestini.modules.auth.dto.RegisterRequestDto;
import gestini.modules.jwt.JwtService;
import gestini.modules.role.models.Role;
import gestini.modules.user.models.User;
import gestini.modules.user.repositories.UserRepository;
import gestini.modules.user.services.PasswordResetService;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private PasswordResetService passwordResetService;

    public ResponseEntity<String> login(LoginRequestDto request) {
        try {
            String password = request.getPassword();
            String username = request.getUsername();

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
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Ocurrió un error");
        }
    }

    public ResponseEntity<String> register(RegisterRequestDto request) {
        try {
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
                    .email(request.getEmail())
                    .role(Role.USER)
                    .build();

            userRepository.save(user);

            return ResponseEntity.status(HttpStatus.OK).body("Usuario registrado correctamente");

        } catch (Exception e) {
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

    public void updatePassword(String token, String newPassword) {
        String encodedPassword = passwordEncoder.encode(newPassword);
        passwordResetService.resetPassword(token, encodedPassword);
    }

}