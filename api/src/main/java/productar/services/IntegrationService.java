package productar.services;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.fasterxml.jackson.databind.ObjectMapper;

import productar.dto.CreateIntegrationRequest;
import productar.dto.IntegrationConfigRequest;
import productar.dto.IntegrationConfigResponse;
import productar.models.BusinessUnitIntegrationModel;
import productar.models.BusinessUnitModel;
import productar.models.IntegrationModel;
import productar.repositories.BusinessUnitIntegrationRepository;
import productar.repositories.BusinessUnitsRepository;
import productar.repositories.IntegrationRepository;

@Service
public class IntegrationService {

    @Autowired
    private BusinessUnitIntegrationRepository businessUnitIntegrationRepository;

    @Autowired
    private BusinessUnitsRepository businessUnitsRepository;

    @Autowired
    private IntegrationRepository integrationRepository;

    public List<IntegrationModel> getAllIntegrations() {
        return integrationRepository.findAll();
    }

    public String getIntegrationConfigForBusinessUniTString(Long businessUnitId, Long integrationId) {
        return businessUnitIntegrationRepository.findByBusinessUnitIdAndIntegrationId(businessUnitId, integrationId)
                .map(BusinessUnitIntegrationModel::getConfigData)
                .orElse(null);
    }

    public void createIntegration(CreateIntegrationRequest createRequest) {
        // Crear una nueva instancia de IntegrationModel
        IntegrationModel newIntegration = new IntegrationModel();
        newIntegration.setName(createRequest.getName());
        newIntegration.setDescription(createRequest.getDescription());
        newIntegration.setImageUrl(createRequest.getImageUrl());

        // Almacenar configData directamente en la tabla de integraciones
        if (createRequest.getConfigData() != null) {
            ObjectMapper objectMapper = new ObjectMapper();
            try {
                String configDataJson = objectMapper.writeValueAsString(createRequest.getConfigData());
                newIntegration.setConfigData(configDataJson);
            } catch (Exception e) {
                throw new RuntimeException("Error al convertir configData a JSON", e);
            }
        } else {
            newIntegration.setConfigData(null); // O un valor predeterminado
        }

        // Guardar la nueva integración en la base de datos
        integrationRepository.save(newIntegration);
    }

    public List<BusinessUnitIntegrationModel> getIntegrationsForBusinessUnit(Long businessUnitId) {
        return businessUnitIntegrationRepository.findByBusinessUnitId(businessUnitId);
    }

    public void configureIntegration(Long businessUnitId, Long integrationId, Boolean enabled,
            Map<String, Object> configData) {
        ObjectMapper objectMapper = new ObjectMapper();
        String configDataJson;

        try {
            configDataJson = objectMapper.writeValueAsString(configData);
        } catch (Exception e) {
            throw new RuntimeException("Error al convertir la configuración a JSON", e);
        }

        BusinessUnitModel businessUnit = businessUnitsRepository.findById(businessUnitId)
                .orElseThrow(
                        () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Unidad de negocio no encontrada"));

        IntegrationModel integration = integrationRepository.findById(integrationId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Integración no encontrada"));

        BusinessUnitIntegrationModel integrationModel = businessUnitIntegrationRepository
                .findByBusinessUnitIdAndIntegrationId(businessUnitId, integrationId)
                .orElse(new BusinessUnitIntegrationModel());

        integrationModel.setBusinessUnit(businessUnit);
        integrationModel.setIntegration(integration);
        integrationModel.setEnabled(enabled);
        integrationModel.setConfigData(configDataJson);

        businessUnitIntegrationRepository.save(integrationModel);
    }

    public <T> T getIntegrationConfigForBusinessUnit(Long businessUnitId, Long integrationId, Class<T> configType) {
        String jsonData = businessUnitIntegrationRepository
                .findByBusinessUnitIdAndIntegrationId(businessUnitId, integrationId)
                .map(BusinessUnitIntegrationModel::getConfigData)
                .orElse(null);

        ObjectMapper objectMapper = new ObjectMapper();
        T configData = null;

        try {
            if (jsonData != null) {
                System.out.println("JSON Data: " + jsonData); // Imprime el JSON para depuración
                configData = objectMapper.readValue(jsonData, configType);
            }
        } catch (Exception e) {
            e.printStackTrace(); // Imprime el stack trace para obtener más detalles
            throw new RuntimeException("Error al convertir el JSON de configuración", e);
        }

        return configData;
    }

    public void updateIntegrationConfig(Long businessUnitId, IntegrationConfigRequest configRequest) {
        BusinessUnitIntegrationModel integrationModel = businessUnitIntegrationRepository
                .findByBusinessUnitIdAndIntegrationId(businessUnitId, configRequest.getIntegrationId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Integración no encontrada"));

        // Imprime el estado del objeto antes de la actualización
        System.out.println("Integration Model Before Update: " + integrationModel);

        if (configRequest.getEnabled() != null) {
            integrationModel.setEnabled(configRequest.getEnabled());
        }

        if (configRequest.getConfigData() != null) {
            ObjectMapper objectMapper = new ObjectMapper();
            try {
                String existingConfigData = integrationModel.getConfigData();
                Map<String, Object> existingConfigMap = existingConfigData != null
                        ? objectMapper.readValue(existingConfigData, Map.class)
                        : new HashMap<>();

                Map<String, Object> newConfigMap = objectMapper.convertValue(configRequest.getConfigData(), Map.class);

                // Verificar propiedades nuevas
                for (String key : newConfigMap.keySet()) {
                    if (!existingConfigMap.containsKey(key)) {
                        throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                                "Propiedad '" + key + "' no es editable");
                    }
                }

                // Actualizar la configuración existente con los datos proporcionados
                existingConfigMap.putAll(newConfigMap);

                String updatedConfigData = objectMapper.writeValueAsString(existingConfigMap);
                integrationModel.setConfigData(updatedConfigData);

                // Imprime la configuración actualizada
                System.out.println("Updated Config Data: " + updatedConfigData);
            } catch (Exception e) {
                throw new RuntimeException("Error al actualizar la configuración", e);
            }
        }

        // Guarda el modelo actualizado
        businessUnitIntegrationRepository.save(integrationModel);
    }

    public Map<String, Object> getIntegrationConfig(Long integrationId) {
        IntegrationModel integration = integrationRepository.findById(integrationId)
                .orElseThrow(() -> new RuntimeException("Integración no encontrada: " + integrationId));

        ObjectMapper objectMapper = new ObjectMapper();
        Map<String, Object> configDataMap = null;
        try {
            if (integration.getConfigData() != null) {
                configDataMap = objectMapper.readValue(integration.getConfigData(), Map.class);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return configDataMap;
    }

    public IntegrationConfigResponse getIntegrationConfigForBusinessUnit(Long businessUnitId, Long integrationId) {
        BusinessUnitIntegrationModel integrationModel = businessUnitIntegrationRepository
                .findByBusinessUnitIdAndIntegrationId(businessUnitId, integrationId)
                .orElse(null);

        if (integrationModel == null) {
            return null;
        }

        ObjectMapper objectMapper = new ObjectMapper();
        Map<String, Object> configDataMap = null;
        try {
            if (integrationModel.getConfigData() != null) {
                configDataMap = objectMapper.readValue(integrationModel.getConfigData(), Map.class);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return new IntegrationConfigResponse(integrationModel.getEnabled(), configDataMap);
    }

    private String convertMapToJson(Map<String, Object> map) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            return objectMapper.writeValueAsString(map);
        } catch (Exception e) {
            throw new RuntimeException("Error al convertir el mapa de configuración a JSON", e);
        }
    }

    public void assignIntegrationToBusinessUnit(Long integrationId, Long businessUnitId) {
        System.out.println("ID de Integración: " + integrationId);
        System.out.println("ID de Unidad de Negocio: " + businessUnitId);

        // Verificar si la integración ya está asignada a la unidad de negocio
        boolean alreadyAssigned = businessUnitIntegrationRepository
                .findByBusinessUnitIdAndIntegrationId(businessUnitId, integrationId)
                .isPresent();

        if (alreadyAssigned) {
            throw new RuntimeException("La integración ya está asignada a esta unidad de negocio");
        }

        IntegrationModel integration = integrationRepository.findById(integrationId)
                .orElseThrow(() -> new RuntimeException("Integración no encontrada: " + integrationId));

        BusinessUnitModel businessUnit = businessUnitsRepository.findById(businessUnitId)
                .orElseThrow(() -> new RuntimeException("Unidad de negocio no encontrada: " + businessUnitId));

        System.out.println("Integración encontrada: " + integration);
        System.out.println("Unidad de negocio encontrada: " + businessUnit);

        BusinessUnitIntegrationModel businessUnitIntegration = new BusinessUnitIntegrationModel();
        businessUnitIntegration.setIntegration(integration);
        businessUnitIntegration.setBusinessUnit(businessUnit);

        // Copiar la configuración inicial de la integración
        businessUnitIntegration.setConfigData(integration.getConfigData());

        businessUnitIntegrationRepository.save(businessUnitIntegration);
    }

    public void updateIntegrationDetails(Long integrationId, IntegrationModel updatedDetails) {
        IntegrationModel existingIntegration = integrationRepository.findById(integrationId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Integración no encontrada"));

        if (updatedDetails.getName() != null) {
            existingIntegration.setName(updatedDetails.getName());
        }
        if (updatedDetails.getDescription() != null) {
            existingIntegration.setDescription(updatedDetails.getDescription());
        }
        if (updatedDetails.getImageUrl() != null) {
            existingIntegration.setImageUrl(updatedDetails.getImageUrl());
        }
        // Aquí puedes añadir otros campos generales si es necesario

        integrationRepository.save(existingIntegration);
    }
}
