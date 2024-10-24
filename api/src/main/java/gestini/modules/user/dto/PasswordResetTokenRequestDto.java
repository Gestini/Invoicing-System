package gestini.modules.user.dto;

import lombok.Data;

@Data
public class PasswordResetTokenRequestDto {
    private String token;
    private String newPassword;
}
