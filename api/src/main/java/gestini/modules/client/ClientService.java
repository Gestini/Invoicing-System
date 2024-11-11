package gestini.modules.client;

import java.lang.reflect.Field;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import gestini.modules.businessUnit.models.BusinessUnitModel;
import gestini.modules.businessUnit.repositories.BusinessUnitsRepository;
import gestini.modules.client.dto.ClientDto;
import gestini.modules.client.models.ClientModel;
import gestini.modules.client.repositories.ClientRepository;

@Service
public class ClientService {

    @Autowired
    private ClientRepository clientRepository;

    @Autowired
    private BusinessUnitsRepository businessUnitsRepository;

    public ResponseEntity<?> createClient(ClientDto newClient, Long unitId) {
        try {
            Optional<BusinessUnitModel> unitOptional = businessUnitsRepository.findById(unitId);
            if (!unitOptional.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Cliente no encontrado");
            }

            ClientModel newClientModel = new ClientModel();
            newClientModel.setDni(newClient.getDni());
            newClientModel.setName(newClient.getName());
            newClientModel.setEmail(newClient.getEmail());
            newClientModel.setPhone(newClient.getPhone());
            newClientModel.setAddress(newClient.getAddress());
            newClientModel.setDescription(newClient.getDescription());

            BusinessUnitModel unit = unitOptional.get();

            newClientModel.setBusinessUnit(unit);
            ClientModel savedClient = clientRepository.save(newClientModel);

            return ResponseEntity.ok(savedClient);
        } catch (Exception e) {
            System.err.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Ocurrió un error" + e.getMessage());
        }
    }

    public ResponseEntity<?> updateClient(Long clientId, ClientDto clientData) {
        try {
            Optional<ClientModel> clientOptional = this.findClientById(clientId);
            if (!clientOptional.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Cliente no encontrado");
            }

            ClientModel client = clientOptional.get();

            Field[] fields = clientData.getClass().getDeclaredFields();
            for (Field field : fields) {
                field.setAccessible(true);
                Object value = field.get(clientData);
                if (value != null && !(value instanceof String && ((String) value).isEmpty())) {
                    Field clientField = client.getClass().getDeclaredField(field.getName());
                    clientField.setAccessible(true);
                    clientField.set(client, value);
                }
            }

            clientRepository.save(client);

            return ResponseEntity.ok("Cliente actualizado correctamente");
        } catch (NoSuchFieldException | IllegalAccessException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Ocurrió un error");
        }
    }

    public ResponseEntity<?> deleteClientById(Long clientId) {
        try {
            Optional<ClientModel> clientOptional = this.findClientById(clientId);
            if (!clientOptional.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Cliente no encontrado");
            }

            clientRepository.deleteById(clientId);
            return ResponseEntity.ok("Cliente eliminado correctamente");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Ocurrió un error");
        }
    }

    public List<ClientModel> findClientsByUnitId(Long unitId) {
        return clientRepository.findClientsByUnitId(unitId);
    }

    private Optional<ClientModel> findClientById(Long clientId) {
        return clientRepository.findById(clientId);
    }

}
