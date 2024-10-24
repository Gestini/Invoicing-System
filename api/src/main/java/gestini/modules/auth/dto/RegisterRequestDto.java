package gestini.modules.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RegisterRequestDto {

    @Email(message = "Por favor, ingresa un correo electrónico válido.")
    @NotBlank(message = "El correo electrónico es obligatorio.")
    @Schema(example = "arviixzuh@gmail.com")
    private String email;

    @NotBlank(message = "El username es obligatorio.")
    @Size(min = 3, max = 20, message = "El username debe tener entre 3 y 20 caracteres.")
    @Pattern(regexp = "^[a-zA-Z0-9_]+$", message = "El username solo puede contener letras, números y guiones bajos (_).")
    @Schema(example = "Arviixzuh")
    private String username;

    @NotBlank(message = "La contraseña es obligatoria.")
    @Size(min = 8, max = 20, message = "La contraseña debe tener entre 8 y 20 caracteres.")
    @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[\\W_]).{8,20}$", message = "La contraseña debe incluir al menos una mayúscula, un número y un carácter especial.")
    @Schema(example = "Password123*")
    private String password;

    @NotBlank(message = "La repetición de la contraseña es obligatoria.")
    @Schema(example = "Password123*")
    private String repeatPassword;
}
