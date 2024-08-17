package productar.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class InvitationModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private BusinessUnitsModel businessUnit;

    @ManyToOne
    private User inviter;

    private String inviteeEmail;
    private String token;
    private boolean accepted;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public BusinessUnitsModel getBusinessUnit() {
        return businessUnit;
    }

    public void setBusinessUnit(BusinessUnitsModel businessUnit) {
        this.businessUnit = businessUnit;
    }

    public User getInviter() {
        return inviter;
    }

    public void setInviter(User inviter) {
        this.inviter = inviter;
    }

    public String getInviteeEmail() {
        return inviteeEmail;
    }

    public void setInviteeEmail(String inviteeEmail) {
        this.inviteeEmail = inviteeEmail;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public boolean isAccepted() {
        return accepted;
    }

    public void setAccepted(boolean accepted) {
        this.accepted = accepted;
    }

    // Getters y Setters
}
