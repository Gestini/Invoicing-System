package productar.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import productar.dto.UserResponse;
import productar.models.User;
import productar.repositories.UserRepository;

@Service
public class UserService {
    @Autowired
    UserRepository userRepository;

    public List<UserResponse> loadAllUsers() {
        List<User> users = userRepository.findAll();
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
