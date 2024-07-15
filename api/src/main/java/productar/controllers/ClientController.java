package productar.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import productar.dto.ClientDTO;
import productar.models.BusinessUnitsModel;
import productar.models.ClientModel;
import productar.services.ClientService;

import java.util.List;

@RestController
@RequestMapping("/clients")
public class ClientController {

    private final ClientService ClientService;

    @Autowired
    public ClientController(ClientService ClientService) {
        this.ClientService = ClientService;
    }

    @GetMapping
    public ResponseEntity<List<ClientModel>> getAllClients() {
        List<ClientModel> Clients = ClientService.getAllClients();
        return ResponseEntity.ok(Clients);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ClientModel> getClientById(@PathVariable("id") Long id) {
        ClientModel Client = ClientService.getClientById(id);
        if (Client != null) {
            return ResponseEntity.ok(Client);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/by-business-unit/{businessUnitId}")
    public List<ClientDTO> getClientsByBusinessUnit(@PathVariable Long businessUnitId) {
        return ClientService.getClientsByBusinessUnit(businessUnitId);
    }

    @PostMapping
    public ResponseEntity<ClientModel> createClient(@RequestBody ClientModel Client) {
        if (Client.getBusinessUnit() == null || Client.getBusinessUnit().getId() == null) {
            // Manejo de error si businessUnitId no está presente en el objeto ClientModel
            return ResponseEntity.badRequest().build();
        }

        BusinessUnitsModel businessUnit = new BusinessUnitsModel();
        businessUnit.setId(Client.getBusinessUnit().getId());

        ClientModel createdClient = ClientService.createClient(Client, businessUnit);
        return new ResponseEntity<>(createdClient, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ClientModel> updateClient(@PathVariable("id") Long id,
            @RequestBody ClientModel Client) {
        ClientModel updatedClient = ClientService.updateClient(id, Client);
        return ResponseEntity.ok(updatedClient);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteClient(@PathVariable("id") Long id) {
        ClientService.deleteClient(id);
        return ResponseEntity.noContent().build();
    }
}
