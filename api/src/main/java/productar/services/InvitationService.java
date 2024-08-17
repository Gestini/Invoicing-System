package productar.services;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import productar.models.BusinessUnitsModel;
import productar.models.InvitationModel;
import productar.models.User;
import productar.repositories.BusinessUnitsRepository;
import productar.repositories.InvitationRepository;
import productar.repositories.UserRepository;

@Service
public class InvitationService {

    @Autowired
    private InvitationRepository invitationRepository;

    @Autowired
    private BusinessUnitsRepository businessUnitsRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmailSenderService emailSenderService;

    public void sendInvitation(String inviteeEmail, Long businessUnitId, User inviter) {
        BusinessUnitsModel businessUnit = businessUnitsRepository.findById(businessUnitId)
                .orElseThrow(() -> new RuntimeException("Unidad de negocio no encontrada"));

        String token = UUID.randomUUID().toString();

        InvitationModel invitation = new InvitationModel();
        invitation.setBusinessUnit(businessUnit);
        invitation.setInviteeEmail(inviteeEmail);
        invitation.setInviter(inviter);
        invitation.setToken(token);
        invitation.setAccepted(false);

        invitationRepository.save(invitation);

        String invitationLink = "http://localhost:5173/invite?token=" + token;
        emailSenderService.sendSimpleEmail(inviteeEmail, "Invitación a Unidad de Negocio",
                "Has sido invitado a unirte a la unidad de negocio: " + businessUnit.getName() +
                        ". Usa el siguiente enlace para aceptar la invitación: " + invitationLink);
    }

    public void handleInvitation(String token, boolean accepted) {
        InvitationModel invitation = invitationRepository.findByToken(token)
                .orElseThrow(() -> new RuntimeException("Invitación no válida"));

        if (accepted) {
            User invitee = userRepository.findByEmail(invitation.getInviteeEmail())
                    .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

            // Lógica para añadir el usuario a la unidad de negocio
            invitation.setAccepted(true);
            invitationRepository.save(invitation);
        } else {
            // Eliminar la invitación si se rechaza
            invitationRepository.delete(invitation);
        }
    }
}
