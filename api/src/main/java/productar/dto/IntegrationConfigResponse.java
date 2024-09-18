package productar.dto;

import java.util.Map;

public class IntegrationConfigResponse {
    private Boolean enabled;
    private Map<String, Object> configData;

    // Constructor, getters, and setters
    public IntegrationConfigResponse(Boolean enabled, Map<String, Object> configData) {
        this.enabled = enabled;
        this.configData = configData;
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