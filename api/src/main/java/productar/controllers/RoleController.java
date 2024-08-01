package productar.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import productar.models.RoleModel;
import productar.models.RolePermissionsModel;
import productar.models.RoleUsersModel;
import productar.services.RoleService;

@RestController
@RequestMapping("/role")
public class RoleController {

    @Autowired
    private RoleService roleService;

    @PostMapping
    public RoleModel createRole(@RequestBody RoleModel role) {
        return roleService.createRole(role);
    }

    @GetMapping("/get-by-unit/{businessUnitId}")
    public List<RoleModel> getRolesByUnit(@PathVariable Long businessUnitId) {
        return roleService.getRolesByUnit(businessUnitId);
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateRole(@PathVariable("id") Long id, @RequestBody RoleModel role) {
        return roleService.updateRole(id, role);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteClient(@PathVariable("id") Long id) {
        return roleService.deleteRoleById(id);
    }

    @PostMapping("/add-perms")
    public RolePermissionsModel addRolePerms(@RequestBody RolePermissionsModel rolepPermissions) {
        return roleService.addPermissionsRole(rolepPermissions);
    }

    @PostMapping("/remove-perms/{roleId}/{permissionId}")
    public ResponseEntity<String> removeRolePerms(@PathVariable("roleId") Long roleId,
            @PathVariable("permissionId") Long permissionId) {
        return roleService.removePermissionsRole(roleId, permissionId);
    }

    @PostMapping("/add-user")
    public ResponseEntity<String> addUserRole(@RequestBody RoleUsersModel roleUsersModel) {
        return roleService.addUserRole(roleUsersModel);
    }

    @DeleteMapping("/remove-user/{roleId}/{userId}")
    public ResponseEntity<String> romoveUserRole(@PathVariable("roleId") Long roleId,
            @PathVariable("userId") Long userId) {
        return roleService.removeUserRole(roleId, userId);
    }
}
