package productar.dto;

import java.util.Map;

public class IntegrationConfigRequest {
    private Long integrationId;
    private Boolean enabled;
    private Map<String, Object> configData; // Cambiado a Map<String, Object>

    // Getters y Setters
    public Long getIntegrationId() {
        return integrationId;
    }

    public void setIntegrationId(Long integrationId) {
        this.integrationId = integrationId;
    }

    public Boolean getEnabled() {
        return enabled;
    }

    public void setEnabled(Boolean enabled) {
        this.enabled = enabled;
    }

    public Map<String, Object> getConfigData() {
        return configData;
    }

    public void setConfigData(Map<String, Object> configData) {
        this.configData = configData;
    }
}
