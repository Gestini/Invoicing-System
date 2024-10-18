package gestini.modules.drive.dto;

import java.time.LocalDate;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class CreateFileEntityDto {

    @Schema(description = "ID de la unidad de negocio", example = "1", required = false)
    private Long businessUnitId;

    @Schema(description = "ID de la empresa", example = "1", required = false)
    private Long companyId;

    @NotBlank
    @Size(max = 255)
    @Schema(description = "Nombre del archivo o carpeta", example = "mi_archivo.txt", required = true)
    private String name;

    @NotBlank
    @Size(max = 500)
    @Schema(description = "Ruta del archivo", example = "/path/to/my_file.txt", required = true)
    private String path;

    @Schema(description = "Indica si es una carpeta", example = "false", required = false)
    private boolean isFolder;

    @Schema(description = "Tipo de contenido del archivo", example = "text/plain", required = false)
    private String contentType;

    @Schema(description = "Tamaño del archivo en bytes", example = "1024", required = false)
    private Long size;

    @Schema(description = "Fecha de creación", example = "2024-01-01", required = false)
    private LocalDate createdAt;

    @Schema(description = "Fecha de actualización", example = "2024-01-01", required = false)
    private LocalDate updatedAt;

    public Long getBusinessUnitId() {
        return businessUnitId;
    }

    public void setBusinessUnitId(Long businessUnitId) {
        this.businessUnitId = businessUnitId;
    }

    public Long getCompanyId() {
        return companyId;
    }

    public void setCompanyId(Long companyId) {
        this.companyId = companyId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public boolean isFolder() {
        return isFolder;
    }

    public void setFolder(boolean folder) {
        isFolder = folder;
    }

    public String getContentType() {
        return contentType;
    }

    public void setContentType(String contentType) {
        this.contentType = contentType;
    }

    public Long getSize() {
        return size;
    }

    public void setSize(Long size) {
        this.size = size;
    }

    public LocalDate getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDate createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDate getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDate updatedAt) {
        this.updatedAt = updatedAt;
    }
}
