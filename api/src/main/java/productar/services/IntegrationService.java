package productar.services;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
        IntegrationModel newIntegration = new IntegrationModel();
        newIntegration.setName(createRequest.getName());
        newIntegration.setDescription(createRequest.getDescription());
        newIntegration.setImageUrl(createRequest.getImageUrl());

        // Guarda la nueva integración
        integrationRepository.save(newIntegration);

        // Crea una nueva entrada en BusinessUnitIntegrationModel si hay un
        // businessUnitId
        // En este caso, puedes dejar businessUnit como null o manejarlo si es necesario
        BusinessUnitIntegrationModel businessUnitIntegration = new BusinessUnitIntegrationModel();
        businessUnitIntegration.setIntegration(newIntegration);
        businessUnitIntegration.setEnabled(createRequest.getEnabled() != null ? createRequest.getEnabled() : true);

        // Almacena configData si está presente en la solicitud
        if (createRequest.getConfigData() != null) {
            ObjectMapper objectMapper = new ObjectMapper();
            try {
                String configDataJson = objectMapper.writeValueAsString(createRequest.getConfigData());
                businessUnitIntegration.setConfigData(configDataJson);
            } catch (Exception e) {
                throw new RuntimeException("Error al convertir configData a JSON", e);
            }
        } else {
            businessUnitIntegration.setConfigData(""); // O puedes usar null si prefieres
        }

        // Guarda la relación BusinessUnitIntegrationModel
        businessUnitIntegrationRepository.save(businessUnitIntegration);
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

        // Actualiza los campos si son proporcionados
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

                // Actualiza la configuración existente con los datos proporcionados
                Map<String, Object> newConfigMap = objectMapper.convertValue(configRequest.getConfigData(), Map.class);
                existingConfigMap.putAll(newConfigMap);

                // Convierte el mapa de configuración a JSON
                String updatedConfigData = objectMapper.writeValueAsString(existingConfigMap);
                integrationModel.setConfigData(updatedConfigData);
            } catch (Exception e) {
                throw new RuntimeException("Error al actualizar la configuración", e);
            }
        }

        businessUnitIntegrationRepository.save(integrationModel);
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

    public void assignIntegrationToBusinessUnit(Long businessUnitId, Long integrationId, Boolean enabled) {

        BusinessUnitModel businessUnit = businessUnitsRepository.findById(businessUnitId)
                .orElseThrow(
                        () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Unidad de negocio no encontrada"));

        IntegrationModel integration = integrationRepository.findById(integrationId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Integración no encontrada"));

        BusinessUnitIntegrationModel integrationModel = new BusinessUnitIntegrationModel();
        integrationModel.setBusinessUnit(businessUnit);
        integrationModel.setIntegration(integration);
        integrationModel.setEnabled(enabled);
        integrationModel.setConfigData(""); // Deja configData vacío o como valor predeterminado

        businessUnitIntegrationRepository.save(integrationModel);
    }
}
