package productar.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
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

}
