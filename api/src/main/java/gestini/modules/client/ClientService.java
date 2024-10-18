package gestini.modules.client;

import java.lang.reflect.Field;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import gestini.modules.businessUnit.models.BusinessUnitModel;
import gestini.modules.client.dto.ClientDto;
import gestini.modules.client.models.ClientModel;
import gestini.modules.client.repositories.ClientRepository;

@Service
public class ClientService {

    @Autowired
    private ClientRepository clientRepository;

    public ClientModel createClient(ClientModel Client, BusinessUnitModel businessUnit) {
        Client.setBusinessUnit(businessUnit);
        return clientRepository.save(Client);
    }

    public ClientModel updateClient(Long id, ClientModel client) {
        Optional<ClientModel> existingClientOptional = clientRepository.findById(id);
        if (existingClientOptional.isPresent()) {
            ClientModel existingClient = existingClientOptional.get();
            Field[] fields = ClientModel.class.getDeclaredFields();

            for (Field field : fields) {
                field.setAccessible(true);
                try {
                    Object value = field.get(client);
                    if (value != null) {
                        field.set(existingClient, value);
                    }
                } catch (IllegalAccessException e) {
                    e.printStackTrace();
                }
            }

            return clientRepository.save(existingClient);
        } else {
            return null;
        }
    }

    public void deleteClient(Long id) {
        clientRepository.deleteById(id);
    }

    public Optional<ClientModel> getClientById(Long id) {
        return clientRepository.findById(id);
    }

    public List<ClientModel> getAllClients() {
        return clientRepository.findAll();
    }

    public List<ClientModel> findClientsByName(String name) {
        return clientRepository.findByNameContainingIgnoreCase(name);
    }

    public List<ClientDto> getClientsByBusinessUnit(Long businessUnitId) {
        return clientRepository.findByBusinessUnitId(businessUnitId)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    private ClientDto convertToDTO(ClientModel Client) {
        ClientDto dto = new ClientDto();
        dto.setId(Client.getId());
        dto.setName(Client.getName());
        dto.setDescription(Client.getDescription());
        dto.setPhone(Client.getPhone());
        dto.setEmail(Client.getEmail());
        dto.setAddress(Client.getAddress());
        dto.setDni(Client.getDni());
        dto.setBusinessUnitId(Client.getBusinessUnit().getId());
        return dto;
    }
}
