package productar.services;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import productar.models.FileEntityModel;
import productar.repositories.FileEntityRepository;

@Service
public class FileEntityService {

    @Autowired
    private FileEntityRepository fileEntityRepository;

    public ResponseEntity<?> createFile(FileEntityModel newFile) {
        try {
            Optional<FileEntityModel> file = fileEntityRepository.findByPath(newFile.getPath());
            if (file.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Ese path ya está en uso.");
            }

            newFile.setCreatedAt(LocalDate.now());
            newFile.setUpdatedAt(LocalDate.now());
            FileEntityModel createdFile = fileEntityRepository.save(newFile);
            return ResponseEntity.ok(createdFile);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Ocurrió un error.");
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

            String filePath = file.getPath();

            if (!file.isFolder()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("El padre debe ser una carpeta");
            }

            List<FileEntityModel> childFiles = fileEntityRepository.findByPathStartingWith(filePath + "/");
            return ResponseEntity.ok(childFiles);
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
}
