package gestini.modules.client;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import gestini.modules.businessUnit.models.BusinessUnitModel;
import gestini.modules.client.dto.ClientDto;
import gestini.modules.client.models.ClientModel;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;

@RestController
@RequestMapping("/clients")
@SecurityRequirement(name = "BearerAuth")
public class ClientController {

    @Autowired
    private ClientService clientService;

    @GetMapping
    public ResponseEntity<List<ClientModel>> getAllClients() {
        List<ClientModel> Clients = clientService.getAllClients();
        return ResponseEntity.ok(Clients);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<ClientModel>> getClientById(@PathVariable("id") Long id) {
        Optional<ClientModel> Client = clientService.getClientById(id);
        if (Client != null) {
            return ResponseEntity.ok(Client);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/by-business-unit/{businessUnitId}")
    public List<ClientDto> getClientsByBusinessUnit(@PathVariable Long businessUnitId) {
        return clientService.getClientsByBusinessUnit(businessUnitId);
    }

    @PostMapping
    public ResponseEntity<ClientModel> createClient(@RequestBody ClientModel Client) {
        if (Client.getBusinessUnit() == null || Client.getBusinessUnit().getId() == null) {
            // Manejo de error si businessUnitId no está presente en el objeto ClientModel
            return ResponseEntity.badRequest().build();
        }

        BusinessUnitModel businessUnit = new BusinessUnitModel();
        businessUnit.setId(Client.getBusinessUnit().getId());

        ClientModel createdClient = clientService.createClient(Client, businessUnit);
        return new ResponseEntity<>(createdClient, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ClientModel> updateSupplier(@PathVariable("id") Long id,
            @RequestBody ClientModel supplier) {
        ClientModel updatedSupplier = clientService.updateClient(id, supplier);
        return ResponseEntity.ok(updatedSupplier);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteClient(@PathVariable("id") Long id) {
        clientService.deleteClient(id);
        return ResponseEntity.noContent().build();
    }
}
