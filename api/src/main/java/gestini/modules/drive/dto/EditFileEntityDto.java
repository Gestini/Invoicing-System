package gestini.modules.drive.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class EditFileEntityDto {
    @NotBlank
    @Size(max = 255)
    @Schema(description = "Nombre del archivo o carpeta", example = "mi_archivo.txt", required = true)
    private String name;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
