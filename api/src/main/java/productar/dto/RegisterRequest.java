package productar.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RegisterRequest {
    String email;
    String country;
    String username;
    String password;
    String lastname;
    String firstname;
    String repeatPassword;
}
