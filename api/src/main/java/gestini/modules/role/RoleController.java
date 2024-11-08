package gestini.modules.role;

import java.util.List;
import java.util.Map;

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

import gestini.modules.employee.models.EmployeeModel;
import gestini.modules.role.dto.CreateRoleDto;
import gestini.modules.role.dto.EditRoleDto;
import gestini.modules.role.models.RoleModel;
import gestini.modules.role.models.RolePermissionsModel;
import gestini.modules.role.models.RoleUsersModel;
import gestini.utils.Permission;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.security.SecurityRequirements;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/role")
@SecurityRequirements({
        @SecurityRequirement(name = "BearerAuth"),
        @SecurityRequirement(name = "UnitAccess")
})
public class RoleController {

    @Autowired
    private RoleService roleService;

    @PostMapping
    public ResponseEntity<?> createRole(@Valid @RequestBody CreateRoleDto role) {
        return roleService.createRole(role);
    }

    @GetMapping("/get-by-unit/{businessUnitId}")
    public List<RoleModel> getRolesByUnit(@PathVariable Long businessUnitId) {
        return roleService.getRolesByUnit(businessUnitId);
    }

    @GetMapping("/get-employees/{roleId}")
    public List<EmployeeModel> getEmployeesByRoleId(@PathVariable Long roleId) {
        return roleService.getEmployeesByRoleId(roleId);
    }

    @GetMapping("/has-permissions/{unitId}/{permissionName}")
    public Boolean hasPermissions(@PathVariable Long unitId, @PathVariable Permission permissionName) {
        return roleService.hasPermissions(unitId, permissionName);
    }

    @PostMapping("/has-permissions/{unitId}")
    public ResponseEntity<Map<String, Boolean>> checkMultiplePermissions(
            @PathVariable("unitId") Long unitId,
            @RequestBody List<Permission> permissions) {
        Map<String, Boolean> results = roleService.hasMultiplePermissions(unitId, permissions);
        return ResponseEntity.ok(results);
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateRole(@PathVariable("id") Long id, @Valid @RequestBody EditRoleDto role) {
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
