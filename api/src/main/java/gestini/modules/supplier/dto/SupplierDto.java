package gestini.modules.supplier.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class SupplierDto {
    @Schema(description = "Nombre del proveedor", example = "Arviixzuh", required = true)
    @NotBlank(message = "El nombre es obligatorio")
    private String name;

    @Schema(description = "Descripción del proveedor (opcional)", example = "Proveedor de productos electrónicos")
    @Size(max = 255, message = "La descripción debe tener 255 caracteres o menos")
    private String description;

    @Schema(description = "Número de teléfono del proveedor en formato (###)###-#### (opcional)", example = "(123)456-7890")
    private String phone;

    @Schema(description = "Correo electrónico del proveedor (opcional)", example = "contacto@ejemplo.com")
    @Email(message = "El correo electrónico debe ser válido")
    private String email;

    @Schema(description = "Sitio web del proveedor (opcional)", example = "https://www.ejemplo.com")
    private String website;

    @Schema(description = "Tipo de proveedor (opcional)", example = "Distribuidor")
    private String supplierType;

    @Schema(description = "Razón social del proveedor (opcional)", example = "Proveedor S.A.")
    private String reasonSocial;

    @Schema(description = "Dirección del proveedor (opcional)", example = "Av. Siempre Viva 123")
    private String address;

    @Schema(description = "DNI o identificación del proveedor (opcional)", example = "12345678")
    private String dni;

    @Schema(description = "Condición de venta del proveedor (opcional)", example = "Contado")
    private String saleCondition;

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

    public String getWebsite() {
        return website;
    }

    public void setWebsite(String website) {
        this.website = website;
    }

    public String getSupplierType() {
        return supplierType;
    }

    public void setSupplierType(String supplierType) {
        this.supplierType = supplierType;
    }

    public String getReasonSocial() {
        return reasonSocial;
    }

    public void setReasonSocial(String reasonSocial) {
        this.reasonSocial = reasonSocial;
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

    public String getSaleCondition() {
        return saleCondition;
    }

    public void setSaleCondition(String saleCondition) {
        this.saleCondition = saleCondition;
    }
}
