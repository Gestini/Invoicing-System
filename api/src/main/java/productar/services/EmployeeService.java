package productar.services;

import java.lang.reflect.Field;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import productar.models.EmployeeModel;
import productar.models.InvitationModel;
import productar.repositories.EmployeeRepository;
import productar.repositories.InvitationRepository;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private InvitationRepository invitationRepository;

    @Autowired
    private EmailSenderService emailSenderService;

    @Autowired
    private UserService userService;

    public EmployeeModel createEmployee(EmployeeModel employee) {
        EmployeeModel newEmployee = employeeRepository.save(employee);

        String token = UUID.randomUUID().toString();

        InvitationModel invitation = new InvitationModel();
        invitation.setBusinessUnit(employee.getBusinessUnit());
        invitation.setInviter(userService.getCurrentUser());
        invitation.setToken(token);
        invitation.setAccepted(false);
        invitation.setEmployee(employee);

        invitationRepository.save(invitation);

        String invitationLink = "http://localhost:5173/invite?token=" + token;
        String subject = "Invitación a Unidad de Negocio";
        String message = "Has sido invitado a unirte a la unidad de negocio: " + employee.getBusinessUnit().getName() +
                ". Usa el siguiente enlace para aceptar la invitación: " + invitationLink;

        emailSenderService.sendSimpleEmail(employee.getEmail(), subject, message);

        return newEmployee;
    }

    public List<EmployeeModel> getEmployeesByBusinessUnitId(Long id) {
        return employeeRepository.findByBusinessUnitId(id);
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
