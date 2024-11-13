package gestini.modules.client.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class ClientDto {

    @NotBlank(message = "El nombre es obligatorio")
    @Size(max = 100, message = "El nombre debe tener 100 caracteres o menos")
    @Schema(description = "Nombre del cliente", example = "Juan Pérez", required = true)
    private String name;

    @Size(max = 255, message = "La descripción debe tener 255 caracteres o menos")
    @Schema(description = "Descripción del cliente", example = "Cliente preferente con compras regulares")
    private String description;

    @Schema(description = "Número de teléfono del cliente", example = "+34-600-123-456")
    private String phone;

    @Email(message = "El correo electrónico debe ser válido")
    @Schema(description = "Correo electrónico del cliente", example = "juan.perez@ejemplo.com")
    private String email;

    @Schema(description = "Dirección del cliente", example = "Calle Mayor 123, Madrid")
    private String address;

    @Schema(description = "DNI del cliente", example = "12345678X")
    private String dni;

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

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getDni() {
        return dni;
    }

    public void setDni(String dni) {
        this.dni = dni;
    }



}
