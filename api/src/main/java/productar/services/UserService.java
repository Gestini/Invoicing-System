package productar.services;

import java.lang.reflect.Field;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import productar.dto.UserResponse;
import productar.dto.UserTokenResponse;
import productar.models.User;
import productar.repositories.UserRepository;

@Service
public class UserService {
    @Autowired
    UserRepository userRepository;

    @Autowired
    UserSessionsService userSessions;

    @Autowired
    UserDetailsService userDetailsService;

    public List<UserResponse> loadAllUsers() {
        List<User> users = userRepository.findAll();
        return users.stream()
                .map(this::Convert)
                .collect(Collectors.toList());
    }

    public List<User> searchByUsername(String username) {
        return userRepository.searchByUsername(username);
    }

    public List<UserTokenResponse> getUserSessions(List<String> tokens) {
        return tokens.stream()
                .map(token -> {
                    String username = userSessions.getUsernameFromToken(token);
                    if (username == null)
                        return null;

                    UserDetails userDetails = userDetailsService.loadUserByUsername(username);
                    boolean isTokenValid = userSessions.isTokenValid(token, userDetails);

                    UserResponse user = Convert(userRepository.findByUsername(username).orElse(null));

                    UserTokenResponse response = new UserTokenResponse();
                    response.setUser(user);
                    response.setTokenValid(isTokenValid);
                    return response;
                })
                .filter(Objects::nonNull)
                .collect(Collectors.toList());
    }

    public List<UserResponse> findByIds(List<Integer> userIds) {
        List<User> users = userRepository.findAllById(userIds);
        return users.stream()
                .map(this::Convert)
                .collect(Collectors.toList());
    }

    private UserResponse Convert(User user) {
        UserResponse userResponse = new UserResponse();
        userResponse.setId(user.getId());
        userResponse.setEmail(user.getEmail());
        userResponse.setCountry(user.getCountry());
        userResponse.setUsername(user.getUsername());
        userResponse.setLastname(user.getLastname());
        userResponse.setFirtsname(user.getFirtsname());
        return userResponse;
    }

    public User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return (User) authentication.getPrincipal();
    }

    public ResponseEntity<?> updateUser(User data) {
        try {
            User currentUser = getCurrentUser();
            Optional<User> existingUserOptional = userRepository.findByUsername(currentUser.getUsername());

            if (!existingUserOptional.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuario no encontrado");
            }

            User existingUser = existingUserOptional.get();

            copyNonNullProperties(data, existingUser);

            userRepository.save(existingUser);

            return ResponseEntity.ok("Usuario actualizado correctamente");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Ocurrió un error inesperado");
        }
    }

    private void copyNonNullProperties(User source, User existingUser) {
        Field[] fields = User.class.getDeclaredFields();
        for (Field field : fields) {
            try {
                field.setAccessible(true);
                Object value = field.get(source);
                if (value != null) {
                    field.set(existingUser, value);
                }
            } catch (IllegalAccessException e) {
                e.printStackTrace();
            }
        }
    }
}
