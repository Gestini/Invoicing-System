package gestini.modules.integration.dto;

import java.util.Map;

public class IntegrationConfigResponseDto {
    private Boolean enabled;
    private Map<String, Object> configData;

    public IntegrationConfigResponseDto(Boolean enabled, Map<String, Object> configData) {
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