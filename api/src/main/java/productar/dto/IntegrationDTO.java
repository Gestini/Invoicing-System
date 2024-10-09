package productar.dto;

import java.util.Map;

public class IntegrationDTO {
    private Long id;
    private String name;
    private String description;
    private Boolean enabled;
    private String imageUrl; // Añadido campo para la URL de la imagen
    private Map<String, Object> configData; // Añadido campo para la configuración inicial

    // Constructor actualizado
    public IntegrationDTO(Long id, String name, String description, Boolean enabled, String imageUrl,
            Map<String, Object> configData) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.enabled = enabled;
        this.imageUrl = imageUrl;
        this.configData = configData;
    }

    // Getters y Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Boolean getEnabled() {
        return enabled;
    }

    public void setEnabled(Boolean enabled) {
        this.enabled = enabled;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public Map<String, Object> getConfigData() {
        return configData;
    }

    public void setConfigData(Map<String, Object> configData) {
        this.configData = configData;
    }
}
