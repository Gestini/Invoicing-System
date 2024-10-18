package gestini.modules.integration;

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
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import gestini.modules.businessUnit.models.BusinessUnitIntegrationModel;
import gestini.modules.integration.dto.CreateIntegrationRequestDto;
import gestini.modules.integration.dto.IntegrationAssignmentRequestDto;
import gestini.modules.integration.dto.IntegrationConfigRequestDto;
import gestini.modules.integration.dto.IntegrationConfigResponseDto;
import gestini.modules.integration.dto.IntegrationDto;
import gestini.modules.integration.models.IntegrationModel;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;

@RestController
@RequestMapping("/integrations")
@SecurityRequirement(name = "BearerAuth")
public class IntegrationController {

    @Autowired
    private IntegrationService integrationService;

    @GetMapping("/get-all")
    public ResponseEntity<List<IntegrationDto>> getAllIntegrations() {
        List<IntegrationModel> integrations = integrationService.getAllIntegrations();
        List<IntegrationDto> integrationDTOs = integrations.stream()
                .map(integration -> {
                    // Aquí obtienes la configuración de la integración directamente
                    Map<String, Object> configData = integrationService.getIntegrationConfig(integration.getId());
                    return new IntegrationDto(
                            integration.getId(),
                            integration.getName(),
                            integration.getDescription(),
                            true, // Ajusta este valor según la lógica de tu aplicación
                            integration.getImageUrl(),
                            configData);
                })
                .collect(Collectors.toList());
        return ResponseEntity.ok(integrationDTOs);
    }

    @GetMapping("/{businessUnitId}")
    public ResponseEntity<List<IntegrationDto>> getIntegrationsForBusinessUnit(
            @PathVariable Long businessUnitId) {
        List<BusinessUnitIntegrationModel> integrations = integrationService
                .getIntegrationsForBusinessUnit(businessUnitId);
        if (integrations.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        // Transformar la lista de BusinessUnitIntegrationModel a IntegrationDTO
        List<IntegrationDto> integrationDetails = integrations.stream()
                .map(bui -> {
                    IntegrationConfigResponseDto configResponse = integrationService
                            .getIntegrationConfigForBusinessUnit(businessUnitId, bui.getIntegration().getId());
                    return new IntegrationDto(
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
    public ResponseEntity<IntegrationConfigResponseDto> getIntegrationConfigForBusinessUnit(
            @PathVariable Long businessUnitId,
            @PathVariable Long integrationId) {
        try {
            IntegrationConfigResponseDto configData = integrationService
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
    public ResponseEntity<String> assignIntegrationToBusinessUnit(@RequestBody IntegrationAssignmentRequestDto request) {
        try {
            integrationService.assignIntegrationToBusinessUnit(
                    request.getIntegrationId(),
                    request.getBusinessUnitId());
            return ResponseEntity.status(HttpStatus.OK).body("Integración asignada correctamente");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Error al asignar la integración");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Error al asignar la integración");
        }
    }

    @PostMapping("/create")
    public ResponseEntity<String> createIntegration(@RequestBody CreateIntegrationRequestDto createRequest) {
        try {
            // Llama al servicio para crear la integración y configurarla
            integrationService.createIntegration(createRequest);
            return ResponseEntity.status(HttpStatus.CREATED).body("Integración creada correctamente");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Error al crear la integración");
        }
    }

    @PatchMapping("/{businessUnitId}/configure")
    public ResponseEntity<String> updateIntegrationConfigForBusinessUnit(
            @PathVariable Long businessUnitId,
            @RequestBody IntegrationConfigRequestDto configRequest) {
        try {
            integrationService.updateIntegrationConfig(businessUnitId, configRequest);
            return ResponseEntity.ok("Integración actualizada correctamente");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Error al actualizar la integración");
        }
    }

    @PutMapping("/update-integration/{id}")
    public ResponseEntity<?> updateIntegrationDetails(
            @PathVariable("id") Long id, @RequestBody IntegrationModel updatedDetails) {
        try {
            integrationService.updateIntegrationDetails(id, updatedDetails);
            return ResponseEntity.ok("Integración actualizada con éxito");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al actualizar la integración");
        }
    }

}
