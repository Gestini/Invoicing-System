package productar.controllers;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import productar.models.User;
import productar.services.InvitationService;

@RestController
@RequestMapping("/invitations")
public class InvitationController {

    @Autowired
    private InvitationService invitationService;

    @PostMapping("/send")
    public ResponseEntity<String> sendInvitation(@RequestBody Map<String, Object> request) {
        String inviteeEmail = (String) request.get("email");
        Long businessUnitId = Long.valueOf(request.get("businessUnitId").toString());
        User inviter = getCurrentUser();

        invitationService.sendInvitation(inviteeEmail, businessUnitId, inviter);
        return ResponseEntity.ok("Invitación enviada");
    }

    @GetMapping("/accept")
    public ResponseEntity<String> acceptInvitation(@RequestParam String token) {
        invitationService.handleInvitation(token, true);
        return ResponseEntity.ok("Invitación aceptada");
    }

    @GetMapping("/reject")
    public ResponseEntity<String> rejectInvitation(@RequestParam String token) {
        invitationService.handleInvitation(token, false);
        return ResponseEntity.ok("Invitación rechazada");
    }

    private User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return (User) authentication.getPrincipal();
    }
}
