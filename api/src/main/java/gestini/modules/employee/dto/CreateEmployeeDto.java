package gestini.modules.employee.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import gestini.modules.employee.models.EmployeeModel.EmployeeStatus;
import io.swagger.v3.oas.annotations.media.Schema;

public class CreateEmployeeDto {

    @Schema(description = "Nombre del empleado", required = true)
    @NotBlank(message = "El nombre no puede estar vacío")
    private String name;

    @Schema(description = "Apellido del empleado", required = true)
    @NotBlank(message = "El apellido no puede estar vacío")
    private String lastname;

    @Schema(description = "Email del empleado", required = true)
    @Email(message = "Email debe ser válido")
    @NotBlank(message = "El email no puede estar vacío")
    private String email;

    @Schema(description = "Estado del empleado", required = true, example = "ACTIVE")
    @NotNull(message = "El estado no puede ser nulo")
    private EmployeeStatus status;

    @Schema(description = "PIN del empleado", required = true)
    @NotBlank(message = "El PIN no puede estar vacío")
    private String pin;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public EmployeeStatus getStatus() {
        return status;
    }

    public void setStatus(EmployeeStatus status) {
        this.status = status;
    }

    public String getPin() {
        return pin;
    }

    public void setPin(String pin) {
        this.pin = pin;
    }
}
