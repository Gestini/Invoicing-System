package productar.services;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
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

}
