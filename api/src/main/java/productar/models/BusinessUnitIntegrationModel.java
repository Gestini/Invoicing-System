package productar.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "business_unit_integration")
public class BusinessUnitIntegrationModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "business_unit_id", nullable = true)
    private BusinessUnitModel businessUnit;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "integration_id", nullable = false)
    private IntegrationModel integration;

    @Column
    private Boolean enabled;

    @Column
    private String configData; // Almacena los datos específicos de configuración de la integración

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public BusinessUnitModel getBusinessUnit() {
        return businessUnit;
    }

    public void setBusinessUnit(BusinessUnitModel businessUnit) {
        this.businessUnit = businessUnit;
    }

    public IntegrationModel getIntegration() {
        return integration;
    }

    public void setIntegration(IntegrationModel integration) {
        this.integration = integration;
    }

    public Boolean getEnabled() {
        return enabled;
    }

    public void setEnabled(Boolean enabled) {
        this.enabled = enabled;
    }

    public String getConfigData() {
        return configData;
    }

    public void setConfigData(String configData) {
        this.configData = configData;
    }

    // Getters y Setters
}
