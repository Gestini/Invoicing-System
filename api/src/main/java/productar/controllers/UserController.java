package productar.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import productar.dto.UserResponse;
import productar.dto.UserTokenResponse;
import productar.models.User;
import productar.services.JwtService;
import productar.services.UserService;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    UserService userService;

    @Autowired
    JwtService jwtService;

    @Autowired
    UserDetailsService userDetailsService;

    @GetMapping("/get-all")
    public List<UserResponse> getAllUsers() {
        return userService.loadAllUsers();
    }

    @PostMapping("/get-user-sessions")
    public List<UserTokenResponse> getUserSessions(@RequestBody List<String> tokens) {
        return userService.getUserSessions(tokens);
    }

    @PostMapping("/get-by-ids")
    public List<UserResponse> getByIds(@RequestBody List<Integer> userIds) {
        return userService.findByIds(userIds);
    }

    @GetMapping("/search-by-username/{username}")
    public List<User> getByUsername(@PathVariable("username") String username) {
        return userService.searchByUsername(username);
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateUser(@RequestBody User data) {
        return userService.updateUser(data);
    }
}
