package gestini.modules.drive;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import gestini.modules.businessUnit.models.BusinessUnitModel;
import gestini.modules.businessUnit.repositories.BusinessUnitsRepository;
import gestini.modules.company.models.CompanyModel;
import gestini.modules.company.repositories.CompanyRepository;
import gestini.modules.drive.dto.CreateFileEntityDto;
import gestini.modules.drive.models.FileEntityModel;
import gestini.modules.drive.repositories.FileEntityRepository;

@Service
public class FileEntityService {

    @Autowired
    private FileEntityRepository fileEntityRepository;

    @Autowired
    private BusinessUnitsRepository businessUnitsRepository;

    @Autowired
    private CompanyRepository companyRepository;

    public ResponseEntity<?> createFile(CreateFileEntityDto newFile, String initialPath) {
        try {
            // Verificar si el archivo inicial existe
            Optional<FileEntityModel> initialFileOptional = fileEntityRepository.findByPath(initialPath);
            if (!initialFileOptional.isPresent()) {
                // Crear el archivo inicial si no existe
                FileEntityModel newInitialFile = new FileEntityModel();
                newInitialFile.setFolder(true);
                newInitialFile.setName(initialPath);
                newInitialFile.setPath(initialPath);
                newInitialFile.setCreatedAt(LocalDate.now());
                newInitialFile.setUpdatedAt(LocalDate.now());

                // Establecer relaciones si están presentes
                if (newFile.getBusinessUnitId() != null) {
                    Optional<BusinessUnitModel> optionalUnit = businessUnitsRepository
                            .findById(newFile.getBusinessUnitId());
                    if (optionalUnit.isPresent()) {
                        newInitialFile.setBusinessUnit(optionalUnit.get());
                    } else {
                        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Unidad de negocio no encontrada");
                    }
                }

                if (newFile.getCompanyId() != null) {
                    Optional<CompanyModel> optionalCompany = companyRepository.findById(newFile.getCompanyId());
                    if (optionalCompany.isPresent()) {
                        newInitialFile.setCompany(optionalCompany.get());
                    } else {
                        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Empresa no encontrada");
                    }
                }

                fileEntityRepository.save(newInitialFile);
            }

            // Verificar si el path ya está en uso
            Optional<FileEntityModel> existingFile = fileEntityRepository.findByPath(newFile.getPath());
            if (existingFile.isPresent()) {
                return ResponseEntity.status(HttpStatus.CONFLICT).body("Ese path ya está en uso.");
            }

            // Crear el nuevo archivo
            FileEntityModel createdFile = new FileEntityModel();
            createdFile.setName(newFile.getName());
            createdFile.setPath(newFile.getPath());
            createdFile.setFolder(newFile.isFolder());
            createdFile.setContentType(newFile.getContentType());
            createdFile.setSize(newFile.getSize());
            createdFile.setCreatedAt(LocalDate.now());
            createdFile.setUpdatedAt(LocalDate.now());

            // Establecer relaciones si están presentes
            if (newFile.getBusinessUnitId() != null) {
                Optional<BusinessUnitModel> optionalUnit = businessUnitsRepository
                        .findById(newFile.getBusinessUnitId());
                if (optionalUnit.isPresent()) {
                    createdFile.setBusinessUnit(optionalUnit.get());
                }
            }

            if (newFile.getCompanyId() != null) {
                Optional<CompanyModel> optionalCompany = companyRepository.findById(newFile.getCompanyId());
                if (optionalCompany.isPresent()) {
                    createdFile.setCompany(optionalCompany.get());
                }
            }

            // Guardar el nuevo archivo en el repositorio
            createdFile = fileEntityRepository.save(createdFile);
            return ResponseEntity.ok(createdFile);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Ocurrió un error: " + e.getMessage());
        }
    }

    @Transactional
    public ResponseEntity<?> renameFile(Long fileId, String newName) {
        try {
            Optional<FileEntityModel> optionalFile = fileEntityRepository.findById(fileId);
            if (!optionalFile.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Archivo no encontrado.");
            }

            FileEntityModel file = optionalFile.get();

            // Almacenar el path anterior
            String oldPath = file.getPath();
            String parentPath = oldPath.substring(0, oldPath.lastIndexOf('/') + 1);

            // Actualizar nombre y path
            file.setName(newName);
            String newPath = parentPath + newName;
            file.setPath(newPath);
            file.setUpdatedAt(LocalDate.now());

            // Si es una carpeta, actualizar el path de los archivos dentro de ella
            if (file.isFolder()) {
                List<FileEntityModel> childFiles = fileEntityRepository.findByPathStartingWith(oldPath + "/");
                for (FileEntityModel childFile : childFiles) {
                    String newChildPath = newPath + childFile.getPath().substring(oldPath.length());
                    childFile.setPath(newChildPath);
                    childFile.setUpdatedAt(LocalDate.now());
                    fileEntityRepository.save(childFile);
                }
            }

            fileEntityRepository.save(file);
            return ResponseEntity.ok("Archivo editado correctamente");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Ocurrió un error");
        }
    }

    @Transactional
    public ResponseEntity<?> deleteFile(Long fileId) {
        try {
            Optional<FileEntityModel> optionalFile = fileEntityRepository.findById(fileId);
            if (!optionalFile.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Archivo no encontrado.");
            }

            FileEntityModel file = optionalFile.get();

            String filePath = file.getPath();

            // Si es una carpeta, eliminar todo su contenido
            if (file.isFolder()) {
                List<FileEntityModel> childFiles = fileEntityRepository.findByPathStartingWith(filePath + "/");
                for (FileEntityModel childFile : childFiles) {
                    fileEntityRepository.delete(childFile);
                }
            }

            fileEntityRepository.delete(file);
            return ResponseEntity.ok("archivo eliminado correctamente");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Ocurrió un error");
        }
    }

    public ResponseEntity<?> findAll() {
        try {
            return ResponseEntity.ok(fileEntityRepository.findAll());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Ocurrió un error.");
        }
    }

    public ResponseEntity<?> findFilesByParentId(Long parentId) {
        try {
            Optional<FileEntityModel> optionalFile = fileEntityRepository.findById(parentId);
            if (!optionalFile.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Archivo no encontrado.");
            }

            FileEntityModel file = optionalFile.get();
            String parentPath = file.getPath();

            if (!file.isFolder()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("El padre debe ser una carpeta");
            }

            List<FileEntityModel> directChildFiles = fileEntityRepository.findDirectChildren(parentPath);

            return ResponseEntity.ok(directChildFiles);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Ocurrió un error.");
        }
    }

    public ResponseEntity<?> findFilesByParentPath(String path) {
        try {
            Optional<FileEntityModel> optionalFile = fileEntityRepository.findByPath(path);
            if (!optionalFile.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Archivo no encontrado.");
            }

            FileEntityModel file = optionalFile.get();

            if (!file.isFolder()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("El padre debe ser una carpeta");
            }

            List<FileEntityModel> directChildFiles = fileEntityRepository.findDirectChildren(path);

            return ResponseEntity.ok(directChildFiles);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Ocurrió un error.");
        }
    }

    public ResponseEntity<?> findFileByPath(String path) {
        try {
            Optional<FileEntityModel> file = fileEntityRepository.findByPath(path);
            if (!file.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Archivo no encontrado.");
            }

            return ResponseEntity.ok(file);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Ocurrió un error.");
        }
    }

    public ResponseEntity<?> findFileId(Long fileId) {
        try {
            Optional<FileEntityModel> file = fileEntityRepository.findById(fileId);
            if (!file.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Archivo no encontrado.");
            }

            return ResponseEntity.ok(file);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Ocurrió un error.");
        }
    }
}
