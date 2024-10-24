package gestini.modules.user.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PasswordResetRequestDto {
    @Email(message = "Por favor, ingresa un correo electrónico válido.")
    @NotBlank(message = "El correo electrónico es obligatorio.")
    @Schema(example = "arviixzuh@gmail.com")
    private String email;
}
