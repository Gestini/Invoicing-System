package gestini.modules.client;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import gestini.annotations.CheckPermissions;
import gestini.modules.client.dto.ClientDto;
import gestini.modules.client.models.ClientModel;
import gestini.utils.Permission;
import gestini.utils.UnitContext;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.security.SecurityRequirements;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/client")
@SecurityRequirements({
        @SecurityRequirement(name = "BearerAuth"),
        @SecurityRequirement(name = "UnitAccess")
})
@CheckPermissions(Permission.MANAGE_OPERATIONS)
public class ClientController {

    @Autowired
    private ClientService clientService;

    @GetMapping("/find-all-by-unit")
    public List<ClientModel> findClientsByUnitId() {
        return clientService.findClientsByUnitId(UnitContext.getUnitId());
    }

    @PostMapping("/create")
    public ResponseEntity<?> createClient(@RequestBody @Valid ClientDto newClient) {
        return clientService.createClient(newClient, UnitContext.getUnitId());
    }

    @PatchMapping("/edit/{clientId}")
    public ResponseEntity<?> updateClient(@PathVariable("clientId") Long clientId,
            @RequestBody @Valid ClientDto client) {
        return clientService.updateClient(clientId, client);
    }

    @DeleteMapping("/delete-by-id/{clientId}")
    public ResponseEntity<?> deleteClientById(@PathVariable("clientId") Long clientId) {
        return clientService.deleteClientById(clientId);
    }
}
