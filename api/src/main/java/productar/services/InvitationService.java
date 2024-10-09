package productar.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import productar.models.EmployeeModel;
import productar.models.EmployeeModel.EmployeeStatus;
import productar.models.BusinessUnitInvitationModel;
import productar.models.User;
import productar.repositories.EmployeeRepository;
import productar.repositories.InvitationRepository;
import productar.repositories.UserRepository;

@Service
public class InvitationService {

    @Autowired
    private InvitationRepository invitationRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private UserService userService;

    public ResponseEntity<String> acceptInvite(String token) {
        try {
            // Obtener la invitación
            BusinessUnitInvitationModel invitation = invitationRepository.findByToken(token)
                    .orElseThrow(() -> new RuntimeException("Invitación no válida"));

            // Obtener al usuario empleado
            User user = userRepository.findByEmail(invitation.getEmployee().getEmail())
                    .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

            // Obtener al empleado
            EmployeeModel employeeInvited = employeeRepository.findById(invitation.getEmployee().getId())
                    .orElseThrow(() -> new RuntimeException("Invitación no válida"));

            String invitationEmail = invitation.getEmployee().getEmail();
            String currentUserEmail = userService.getCurrentUser().getEmail();

            // Verificar si el email del usuario actual coincide con el de la invitación
            if (!invitationEmail.equals(currentUserEmail)) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Esta invitación es para otro usuario.");
            }

            // Establecer la relacion del usuario con el empleado
            employeeInvited.setUser(user);

            // Cambiar el estado del empleado
            employeeInvited.setStatus(EmployeeStatus.ACTIVE);

            // Guardar cambios del empleado invitado
            employeeRepository.save(employeeInvited);

            // Eliminar la invitación
            invitationRepository.deleteById(invitation.getId());
            return ResponseEntity.ok("Invitación aceptada correctamente");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Ocurrió un error: " + e.getMessage());
        }
    }

    public ResponseEntity<String> rejectInvite(String token) {
        try {
            BusinessUnitInvitationModel invitation = invitationRepository.findByToken(token)
                    .orElseThrow(() -> new RuntimeException("Invitación no encontrada"));

            userRepository.findByEmail(invitation.getEmployee().getEmail())
                    .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

            String invitationEmail = invitation.getEmployee().getEmail();
            String currentUserEmail = userService.getCurrentUser().getEmail();

            // Verificar si el email del usuario actual coincide con el de la invitación
            if (!invitationEmail.equals(currentUserEmail)) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Esta invitación es para otro usuario.");
            }

            invitationRepository.delete(invitation);
            return ResponseEntity.ok("Invitación rechazada");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Ocurrió un error");
        }
    }

    public ResponseEntity<?> getInviteByToken(String token) {
        try {
            BusinessUnitInvitationModel invitation = invitationRepository.findByToken(token)
                    .orElseThrow(() -> new RuntimeException("Invitación no encontrada"));

            String invitationEmail = invitation.getEmployee().getEmail();
            String currentUserEmail = userService.getCurrentUser().getEmail();

            // Verificar si el email del usuario actual coincide con el de la invitación
            if (!invitationEmail.equals(currentUserEmail)) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Esta invitación es para otro usuario.");
            }

            return ResponseEntity.ok(invitation);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Ocurrió un error");
        }
    }
}
