package gestini.modules.role;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import gestini.modules.businessUnit.models.BusinessUnitModel;
import gestini.modules.businessUnit.repositories.BusinessUnitsRepository;
import gestini.modules.employee.models.EmployeeModel;
import gestini.modules.role.dto.CreateRoleDto;
import gestini.modules.role.dto.EditRoleDto;
import gestini.modules.role.models.RoleModel;
import gestini.modules.role.models.RolePermissionsModel;
import gestini.modules.role.models.RoleUsersModel;
import gestini.modules.role.repositories.RolePermissionsRepository;
import gestini.modules.role.repositories.RoleRepository;
import gestini.modules.role.repositories.RoleUsersRepository;
import gestini.modules.user.UserService;
import gestini.modules.user.models.User;
import gestini.utils.Permission;

@Service
public class RoleService {

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private RolePermissionsRepository rolePermissionsRepository;

    @Autowired
    private RoleUsersRepository roleUsersRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private BusinessUnitsRepository businessUnitsRepository;

    public ResponseEntity<?> createRole(CreateRoleDto role) {
        try {
            RoleModel newRole = new RoleModel();

            Optional<BusinessUnitModel> optionalUnit = businessUnitsRepository.findById(role.getUnitId());

            if (!optionalUnit.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Unidad de negocio no encontrada.");
            }

            newRole.setName(role.getName());
            newRole.setBusinessUnit(optionalUnit.get());

            RoleModel savedRole = roleRepository.save(newRole);

            return ResponseEntity.ok(savedRole);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Ocurrió un error");
        }
    }

    public ResponseEntity<String> deleteRoleById(Long id) {
        try {
            roleRepository.deleteById(id);
            return ResponseEntity.ok("Rol eliminado correctamente");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Ocurrió un error");
        }
    }

    public List<RoleModel> getRolesByUnit(Long id) {
        return roleRepository.findByBusinessUnitIdWithPermissions(id);
    }

    public List<EmployeeModel> getEmployeesByRoleId(Long id) {
        List<RoleUsersModel> users = roleUsersRepository.findEmployeesByRole(id);
        List<EmployeeModel> employees = new ArrayList<>();

        for (RoleUsersModel user : users) {
            EmployeeModel employee = user.getEmployee();
            employees.add(employee);
        }

        return employees;
    }

    public Boolean hasPermissions(Long unitId, Permission permission) {
        User currentUser = userService.getCurrentUser();
        return roleUsersRepository.hasPermissions(currentUser.getId(), unitId, permission);
    }

    public Map<String, Boolean> hasMultiplePermissions(Long unitId, List<Permission> permissionNames) {
        User currentUser = userService.getCurrentUser();
        Map<String, Boolean> results = new HashMap<>();

        for (Permission permission : permissionNames) {
            boolean hasPermission = roleUsersRepository.hasPermissions(currentUser.getId(), unitId, permission);
            results.put(permission.name(), hasPermission);
        }

        return results;
    }

    public ResponseEntity<String> updateRole(Long id, EditRoleDto updatedRole) {
        try {
            Optional<RoleModel> existingRoleOptional = roleRepository.findById(id);

            if (!existingRoleOptional.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se encontró el rol con ID: " + id);
            }

            RoleModel existingRole = existingRoleOptional.get();

            existingRole.setName(updatedRole.getName());

            roleRepository.save(existingRole);

            return ResponseEntity.ok("Rol actualizado correctamente");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Ocurrió un error");
        }
    }

    public RolePermissionsModel addPermissionsRole(RolePermissionsModel rolePermissions) {
        try {
            return rolePermissionsRepository.save(rolePermissions);
        } catch (Exception e) {
            return null;
        }
    }

    public ResponseEntity<String> removePermissionsRole(long roleId, Long permissionId) {
        try {
            Optional<RoleModel> existingRoleOptional = roleRepository.findById(roleId);

            if (!existingRoleOptional.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se encontró el rol");
            }

            rolePermissionsRepository.deleteById(permissionId);
            return ResponseEntity.ok("Permisos removidos correctamente");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("Ocurrió un error");
        }
    }

    public ResponseEntity<String> addUserRole(RoleUsersModel roleUsers) {
        try {
            Optional<RoleModel> existingRoleOptional = roleRepository.findById(roleUsers.getRole().getId());

            if (!existingRoleOptional.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se encontró el rol");
            }

            Optional<RoleUsersModel> hasRole = roleUsersRepository.userHasRole(roleUsers.getRole().getId(),
                    roleUsers.getEmployee().getId());

            if (hasRole.isPresent()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("El usuario ya tiene ese rol");
            }

            roleUsersRepository.save(roleUsers);

            return ResponseEntity.ok("Rol agregado correctamente al usuario");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("Ocurrió un error");
        }
    }

    public ResponseEntity<String> removeUserRole(long roleId, Long userId) {
        try {
            Optional<RoleModel> existingRoleOptional = roleRepository.findById(roleId);

            if (!existingRoleOptional.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se encontró el rol");
            }

            Optional<RoleUsersModel> hasRole = roleUsersRepository.userHasRole(roleId, userId);

            if (!hasRole.isPresent()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("El usuario no tiene ese rol");
            }

            roleUsersRepository.removeRole(roleId, userId);
            return ResponseEntity.ok("Rol removido correctamente al usuario");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("Ocurrió un error");
        }
    }

}
