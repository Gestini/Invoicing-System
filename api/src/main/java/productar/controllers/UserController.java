package productar.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import productar.dto.UserResponse;
import productar.models.User;
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

    @PostMapping("/get-by-ids")
    public List<UserResponse> getByIds(@RequestBody UserIdsRequest userIds) {
        return userService.findByIds(userIds.getUserIds());
    }

    @GetMapping("/get-by-username/{username}")
    public List<User> getByUsername(@PathVariable("username") String username) {
        return userService.findByUsername(username);
    }

    public static class UserIdsRequest {
        private List<Integer> userIds;

        public List<Integer> getUserIds() {
            return userIds;
        }

        public void setUserIds(List<Integer> userIds) {
            this.userIds = userIds;
        }

    }

}
