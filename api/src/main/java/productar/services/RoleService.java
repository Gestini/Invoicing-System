package productar.services;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import productar.models.EmployeeModel;
import productar.models.RoleModel;
import productar.models.RolePermissionsModel;
import productar.models.RoleUsersModel;
import productar.repositories.RolePermissionsRepository;
import productar.repositories.RoleRepository;
import productar.repositories.RoleUsersRepository;

@Service
public class RoleService {

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private RolePermissionsRepository rolePermissionsRepository;

    @Autowired
    private RoleUsersRepository roleUsersRepository;

    public RoleModel createRole(RoleModel role) {
        return roleRepository.save(role);
    }

    public ResponseEntity<String> deleteRoleById(Long id) {
        try {
            roleRepository.deleteById(id);
            return ResponseEntity.ok("Rol eliminado correctamente");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Ocurrió un error:" + e);
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

    public Boolean hasPermissions(Long userId, String permissionName) {
        return roleUsersRepository.hasPermissions(userId, permissionName);
    }

    public ResponseEntity<String> updateRole(Long id, RoleModel updatedRole) {
        try {
            Optional<RoleModel> existingRoleOptional = roleRepository.findById(id);

            if (!existingRoleOptional.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se encontró el rol con ID: " + id);
            }

            RoleModel existingRole = existingRoleOptional.get();

            // Verificar que el rol recibido no sea nulo y tenga campos válidos
            if (updatedRole == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Los datos del rol a actualizar son nulos");
            }

            // Copiar propiedades no nulas
            copyNonNullProperties(updatedRole, existingRole);

            // Guardar el rol actualizado
            roleRepository.save(existingRole);

            return ResponseEntity.ok("Rol actualizado correctamente");
        } catch (Exception e) {
            e.printStackTrace(); // Imprime el stack trace para depuración
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Ocurrió un error: " + e.getMessage());
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
            return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("Ocurrió un error: " + e.getMessage());
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
            return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("Ocurrió un error: " + e.getMessage());
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
            return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("Ocurrió un error: " + e.getMessage());
        }
    }

    private void copyNonNullProperties(RoleModel source, RoleModel target) {
        Field[] fields = RoleModel.class.getDeclaredFields();
        for (Field field : fields) {
            try {
                field.setAccessible(true);
                Object value = field.get(source);
                if (value != null) {
                    field.set(target, value);
                }
            } catch (IllegalAccessException e) {
                e.printStackTrace();
            }
        }
    }
}
