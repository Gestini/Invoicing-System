package productar.controllers;

import java.util.List;

import productar.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import productar.dto.UserResponse;
import productar.services.UserService;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    UserService userService;

    @GetMapping("/get-all")
    public List<UserResponse> getAllUsers() {
        return userService.loadAllUsers();
    }

    @GetMapping("/get-by-username/{username}")
    public List<User> getByUsername(@PathVariable("username") String username) {
        return userService.findByUsername(username);
    }

}
