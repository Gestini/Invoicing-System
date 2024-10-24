package gestini.modules.auth.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LoginRequestDto {
    @NotBlank(message = "El username es obligatorio.")
    @Size(min = 3, max = 20, message = "El username debe tener entre 3 y 20 caracteres.")
    @Pattern(regexp = "^[a-zA-Z0-9_]+$", message = "El username solo puede contener letras, números y guiones bajos (_).")
    @Schema(example = "arviixzuh")
    private String username;

    @NotBlank(message = "La contraseña es obligatoria.")
    @Size(min = 8, max = 20, message = "La contraseña debe tener entre 8 y 20 caracteres.")
    @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[\\W_]).{8,20}$", message = "La contraseña debe incluir al menos una mayúscula, un número y un carácter especial.")
    @Schema(example = "Clave123*")
    private String password;
}
