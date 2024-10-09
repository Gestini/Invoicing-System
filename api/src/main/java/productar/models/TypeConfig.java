package productar.models;

import java.util.HashMap;
import java.util.Map;
import com.fasterxml.jackson.annotation.JsonAnySetter;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class TypeConfig {
    private Map<String, Object> config = new HashMap<>();

    @JsonAnySetter
    public void setConfig(String key, Object value) {
        this.config.put(key, value);
    }

    public Map<String, Object> getConfig() {
        return config;
    }

    public void setConfig(Map<String, Object> config) {
        if (config == null) {
            this.config = new HashMap<>();
        } else {
            this.config = config;
        }
    }
}
