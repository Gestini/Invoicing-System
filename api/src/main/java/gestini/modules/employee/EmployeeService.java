package gestini.modules.employee;

import java.lang.reflect.Field;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import gestini.modules.businessUnit.models.BusinessUnitModel;
import gestini.modules.businessUnit.repositories.BusinessUnitsRepository;
import gestini.modules.employee.dto.CreateEmployeeDto;
import gestini.modules.employee.models.EmployeeModel;
import gestini.modules.employee.repositories.EmployeeRepository;
import gestini.modules.invitation.models.BusinessUnitInvitationModel;
import gestini.modules.invitation.repositories.InvitationRepository;
import gestini.modules.user.UserService;
import gestini.modules.user.models.User;
import gestini.utils.EmailSender;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private InvitationRepository invitationRepository;

    @Autowired
    private BusinessUnitsRepository businessUnitsRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private EmailSender emailSender;

    @Value("${clientServerURL}")
    private String CLIENT_SERVER_URL;

    public ResponseEntity<?> createEmployee(Long unitId, CreateEmployeeDto employee) {

        Optional<BusinessUnitModel> unitOptional = businessUnitsRepository.findById(unitId);
        if (!unitOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Unidad no encontrada");
        }

        BusinessUnitModel businessUnit = unitOptional.get();

        // Guarda al nuevo empleado
        EmployeeModel newEmployee = new EmployeeModel();
        newEmployee.setPin(employee.getPin());
        newEmployee.setName(employee.getName());
        newEmployee.setEmail(employee.getEmail());
        newEmployee.setStatus(employee.getStatus());
        newEmployee.setLastname(employee.getLastname());
        newEmployee.setBusinessUnit(businessUnit);

        EmployeeModel savedEmployee = employeeRepository.save(newEmployee);

        // Genera un token único para la invitación
        String token = UUID.randomUUID().toString();

        // Crea e inicializa el objeto de invitación
        BusinessUnitInvitationModel invitation = new BusinessUnitInvitationModel();
        invitation.setToken(token);
        invitation.setInviter(userService.getCurrentUser());
        invitation.setEmployee(savedEmployee);
        invitation.setAccepted(false);
        invitation.setBusinessUnit(businessUnit);

        // Guarda la invitación
        invitationRepository.save(invitation);

        // Construye el enlace de invitación
        String invitationLink = CLIENT_SERVER_URL + "/invite/" + token;

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
        emailSender.sendEmail(employee.getEmail(), subject, message);

        // Retorna el nuevo empleado creado
        return ResponseEntity.ok(savedEmployee);
    }

    public ResponseEntity<?> getEmployeesByBusinessUnitId(Long unitId) {
        try {
            List<EmployeeModel> employees = employeeRepository.findByBusinessUnitId(unitId);
            return ResponseEntity.ok(employees);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Ocurrió un error");
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
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Ocurrió un error");
        }
    }

    public ResponseEntity<String> leaveUnit(Long unitId) {
        try {
            User currentUser = userService.getCurrentUser();
            employeeRepository.leaveUnit(currentUser.getId(), unitId);
            return ResponseEntity.ok("Abandonaste la unidad correctamente");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Ocurrió un error");
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
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Ocurrió un error");
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
