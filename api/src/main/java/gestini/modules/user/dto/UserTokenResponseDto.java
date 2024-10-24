package gestini.modules.user.dto;

public class UserTokenResponseDto {
    private UserResponseDto user;
    private boolean isTokenValid;

    public UserResponseDto getUser() {
        return user;
    }

    public void setUser(UserResponseDto user) {
        this.user = user;
    }

    public boolean isTokenValid() {
        return isTokenValid;
    }

    public void setTokenValid(boolean isTokenValid) {
        this.isTokenValid = isTokenValid;
    }
}
