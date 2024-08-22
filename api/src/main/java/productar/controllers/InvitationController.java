package productar.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import productar.services.InvitationService;

@RestController
@RequestMapping("/invitations")
public class InvitationController {

    @Autowired
    private InvitationService invitationService;

    @GetMapping("/accept/{token}")
    public ResponseEntity<String> acceptInvitation(@PathVariable("token") String token) {
        return invitationService.acceptInvite(token);
    }

    @GetMapping("/reject/{token}")
    public ResponseEntity<String> rejectInvitation(@PathVariable("token") String token) {
        return invitationService.rejectInvite(token);
    }

}
