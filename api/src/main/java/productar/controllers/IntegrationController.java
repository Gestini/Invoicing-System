package productar.controllers;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;

import productar.dto.CreateIntegrationRequest;
import productar.dto.IntegrationAssignmentRequest;
import productar.dto.IntegrationConfigRequest;
import productar.dto.IntegrationConfigResponse;
import productar.dto.IntegrationDTO;
import productar.models.BusinessUnitIntegrationModel;

import productar.models.IntegrationModel;
import productar.models.TypeConfig;
import productar.services.BusinessUnitService;
import productar.services.IntegrationService;

@RestController
@RequestMapping("/integrations")
public class IntegrationController {

    @Autowired
    private BusinessUnitService businessUnitService;

    @Autowired
    private IntegrationService integrationService;

    @GetMapping("/get-all")
    public ResponseEntity<List<IntegrationDTO>> getAllIntegrations() {
        List<IntegrationModel> integrations = integrationService.getAllIntegrations();
        List<IntegrationDTO> integrationDTOs = integrations.stream()
                .map(integration -> {
                    // Recupera la configuración para cada integración
                    IntegrationConfigResponse configData = integrationService.getIntegrationConfigForBusinessUnit(null,
                            integration.getId());
                    return new IntegrationDTO(
                            integration.getId(),
                            integration.getName(),
                            integration.getDescription(),
                            true, // Ajusta este valor según la lógica de tu aplicación
                            integration.getImageUrl(), // Incluye el campo imageUrl aquí
                            configData != null ? configData.getConfigData() : null // Configuración inicial
                    );
                })
                .collect(Collectors.toList());
        return ResponseEntity.ok(integrationDTOs);
    }

    @GetMapping("/{businessUnitId}")
    public ResponseEntity<List<IntegrationDTO>> getIntegrationsForBusinessUnit(
            @PathVariable Long businessUnitId) {
        List<BusinessUnitIntegrationModel> integrations = integrationService
                .getIntegrationsForBusinessUnit(businessUnitId);
        if (integrations.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        // Transformar la lista de BusinessUnitIntegrationModel a IntegrationDTO
        List<IntegrationDTO> integrationDetails = integrations.stream()
                .map(bui -> {
                    IntegrationConfigResponse configResponse = integrationService
                            .getIntegrationConfigForBusinessUnit(businessUnitId, bui.getIntegration().getId());
                    return new IntegrationDTO(
                            bui.getIntegration().getId(),
                            bui.getIntegration().getName(),
                            bui.getIntegration().getDescription(),
                            bui.getEnabled(),
                            bui.getIntegration().getImageUrl(),
                            configResponse != null ? configResponse.getConfigData() : null // Incluye la configuración
                                                                                           // inicial
                    );
                })
                .collect(Collectors.toList());

        return ResponseEntity.ok(integrationDetails);
    }

    @GetMapping("/{businessUnitId}/config/{integrationId}")
    public ResponseEntity<IntegrationConfigResponse> getIntegrationConfigForBusinessUnit(
            @PathVariable Long businessUnitId,
            @PathVariable Long integrationId) {
        try {
            IntegrationConfigResponse configData = integrationService
                    .getIntegrationConfigForBusinessUnit(businessUnitId, integrationId);

            if (configData == null) {
                return ResponseEntity.notFound().build();
            }

            return ResponseEntity.ok(configData);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(null); // O cualquier mensaje de error adecuado
        }
    }

    @PostMapping("/assign")
    public ResponseEntity<String> assignIntegrationToBusinessUnit(@RequestBody IntegrationAssignmentRequest request) {
        try {
            integrationService.assignIntegrationToBusinessUnit(
                    request.getBusinessUnitId(),
                    request.getIntegrationId(),
                    request.getEnabled());
            return ResponseEntity.status(HttpStatus.OK).body("Integración asignada correctamente");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Error al asignar la integración: " + e.getMessage());
        }
    }

    @PostMapping("/create")
    public ResponseEntity<String> createIntegration(@RequestBody CreateIntegrationRequest createRequest) {
        try {
            // Llama al servicio para crear la integración y configurarla
            integrationService.createIntegration(createRequest);
            return ResponseEntity.status(HttpStatus.CREATED).body("Integración creada correctamente");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Error al crear la integración: " + e.getMessage());
        }
    }

    @PatchMapping("/{businessUnitId}/configure")
    public ResponseEntity<String> updateIntegrationConfigForBusinessUnit(
            @PathVariable Long businessUnitId,
            @RequestBody IntegrationConfigRequest configRequest) {
        try {
            integrationService.updateIntegrationConfig(businessUnitId, configRequest);
            return ResponseEntity.ok("Integración actualizada correctamente");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Error al actualizar la integración: " + e.getMessage());
        }
    }

    @PostMapping("/configure")
    public ResponseEntity<String> configureIntegration(
            @RequestParam Long businessUnitId,
            @RequestParam Long integrationId,
            @RequestParam Boolean enabled,
            @RequestParam String configData) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            Map<String, Object> configDataMap = objectMapper.readValue(configData, Map.class);

            integrationService.configureIntegration(businessUnitId, integrationId, enabled, configDataMap);
            return ResponseEntity.status(HttpStatus.OK).body("Integración configurada correctamente");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Error al configurar la integración: " + e.getMessage());
        }
    }
}
