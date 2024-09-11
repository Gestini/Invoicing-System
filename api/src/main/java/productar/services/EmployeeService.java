package productar.services;

import java.lang.reflect.Field;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import productar.models.BusinessUnitModel;
import productar.models.EmployeeModel;
import productar.models.InvitationModel;
import productar.models.User;
import productar.repositories.BusinessUnitsRepository;
import productar.repositories.EmployeeRepository;
import productar.repositories.InvitationRepository;
import productar.repositories.RoleUsersRepository;
import productar.utils.Permissions;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private InvitationRepository invitationRepository;

    @Autowired
    private EmailSenderService emailSenderService;

    @Autowired
    private BusinessUnitsRepository businessUnitsRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private RoleUsersRepository roleUsersRepository;

    public EmployeeModel createEmployee(EmployeeModel employee) {
        // Guarda al nuevo empleado
        EmployeeModel newEmployee = employeeRepository.save(employee);

        // Genera un token único para la invitación
        String token = UUID.randomUUID().toString();

        // Crea e inicializa el objeto de invitación
        InvitationModel invitation = new InvitationModel();
        invitation.setBusinessUnit(employee.getBusinessUnit());
        invitation.setInviter(userService.getCurrentUser());
        invitation.setToken(token);
        invitation.setAccepted(false);
        invitation.setEmployee(employee);

        BusinessUnitModel businessUnit = businessUnitsRepository
                .findById(employee.getBusinessUnit().getId())
                .orElseThrow(() -> new RuntimeException("Unidad no encontrada"));

        // Guarda la invitación
        invitationRepository.save(invitation);

        // Construye el enlace de invitación
        String invitationLink = "http://localhost:5173/invite?token=" + token;

        // Establece el asunto y el mensaje del correo electrónico
        String subject = "Invitación para unirte a la Unidad de Negocio";
        String businessUnitName = businessUnit.getName();

        String message = String.format(
                "Hola %s,\n\n"
                        + "¡Te damos la bienvenida! Has recibido una invitación para unirte a nuestra unidad de negocio: %s.\n\n"
                        + "Por favor, usa el siguiente enlace para aceptar la invitación y completar el proceso de incorporación:\n\n"
                        + "%s\n\n"
                        + "Si tienes alguna pregunta, no dudes en ponerte en contacto con nosotros.\n\n"
                        + "Saludos cordiales,\n"
                        + "El equipo de %s",
                employee.getName(),
                businessUnitName,
                invitationLink,
                businessUnitName);

        // Envía el correo electrónico
        emailSenderService.sendSimpleEmail(employee.getEmail(), subject, message);

        // Retorna el nuevo empleado creado
        return newEmployee;
    }

    public ResponseEntity<?> getEmployeesByBusinessUnitId(Long unitId) {
        try {
            // verificar si el usuario tiene permisos
            if (!roleUsersRepository.hasPermissions(userService.getCurrentUser().getId(), unitId,
                    Permissions.HR.getPermission())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("No tienes permisos suficientes.");
            }

            List<EmployeeModel> employees = employeeRepository.findByBusinessUnitId(unitId);
            return ResponseEntity.ok(employees);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Ocurrió un error: " + e.getMessage());
        }
    }

    public List<EmployeeModel> searchEmployeeByName(Long unitId, String name) {
        return employeeRepository.searchEmployeeByName(unitId, name);
    }

    public ResponseEntity<String> deleteEmployee(Long id) {
        try {
            employeeRepository.deleteById(id);
            return ResponseEntity.ok("Empleado eliminado correctamente");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Ocurrió un error: " + e.getMessage());
        }
    }

    public ResponseEntity<String> leaveUnit(Long unitId) {
        try {
            User currentUser = userService.getCurrentUser();
            employeeRepository.leaveUnit(currentUser.getId(), unitId);
            return ResponseEntity.ok("Abandonaste la unidad correctamente");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Ocurrió un error: " + e.getMessage());
        }
    }

    public ResponseEntity<String> updateEmployee(Long id, EmployeeModel updatedEmployee) {
        try {
            Optional<EmployeeModel> existingEmployeeOptional = employeeRepository.findById(id);

            if (!existingEmployeeOptional.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se encontró el empleado con ID: " + id);
            }

            EmployeeModel existingRole = existingEmployeeOptional.get();

            if (updatedEmployee == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Los datos a actualizar son nulos");
            }

            copyNonNullProperties(updatedEmployee, existingRole);
            employeeRepository.save(existingRole);
            return ResponseEntity.ok("Empleado actualizado correctamente");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Ocurrió un error: " + e.getMessage());
        }
    }

    private void copyNonNullProperties(EmployeeModel source, EmployeeModel target) {
        Field[] fields = EmployeeModel.class.getDeclaredFields();
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
