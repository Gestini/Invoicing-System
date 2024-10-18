package gestini.modules.integration.dto;

public class IntegrationAssignmentRequestDto {
    private Long businessUnitId;
    private Long integrationId;

    public Long getBusinessUnitId() {
        return businessUnitId;
    }

    public void setBusinessUnitId(Long businessUnitId) {
        this.businessUnitId = businessUnitId;
    }

    public Long getIntegrationId() {
        return integrationId;
    }

    public void setIntegrationId(Long integrationId) {
        this.integrationId = integrationId;
    }

}
