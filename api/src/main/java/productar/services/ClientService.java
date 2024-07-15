package productar.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.lang.reflect.Field;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import productar.dto.ClientDTO;
import productar.models.BusinessUnitsModel;
import productar.models.ClientModel;
import productar.repositories.ClientRepository;

@Service
public class ClientService {

    @Autowired
    private ClientRepository ClientRepository;

    public ClientModel createClient(ClientModel Client, BusinessUnitsModel businessUnit) {
        Client.setBusinessUnit(businessUnit);
        return ClientRepository.save(Client);
    }

    public ClientModel updateClient(Long id, ClientModel Client) {
        Optional<ClientModel> existingClientOptional = ClientRepository.findById(id);
        if (existingClientOptional.isPresent()) {
            ClientModel existingClient = existingClientOptional.get();
            Field[] fields = ClientModel.class.getDeclaredFields();

            for (Field field : fields) {
                field.setAccessible(true);
                try {
                    Object value = field.get(Client);
                    if (value != null) {
                        field.set(existingClient, value);
                    }
                } catch (IllegalAccessException e) {
                    e.printStackTrace();
                }
            }

            return ClientRepository.save(existingClient);
        } else {
            return null;
        }
    }

    public void deleteClient(Long id) {
        ClientRepository.deleteById(id);
    }

    public ClientModel getClientById(Long id) {
        return ClientRepository.findById(id).orElse(null);
    }

    public List<ClientModel> getAllClients() {
        return ClientRepository.findAll();
    }

    public List<ClientModel> findClientsByName(String name) {
        return ClientRepository.findByNameContainingIgnoreCase(name);
    }

    public List<ClientDTO> getClientsByBusinessUnit(Long businessUnitId) {
        return ClientRepository.findByBusinessUnitId(businessUnitId)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    private ClientDTO convertToDTO(ClientModel Client) {
        ClientDTO dto = new ClientDTO();
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
