package gestini.modules.drive;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import gestini.annotations.CheckPermissions;
import gestini.modules.drive.dto.CreateFileEntityDto;
import gestini.modules.drive.dto.EditFileEntityDto;
import gestini.utils.Permission;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.security.SecurityRequirements;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/files")
@SecurityRequirements({
        @SecurityRequirement(name = "BearerAuth"),
        @SecurityRequirement(name = "UnitAccess")
})
@CheckPermissions(Permission.MANAGE_DOCUMENTS)
public class FileEntityController {

    @Autowired
    private FileEntityService fileSystemEntityService;

    @PostMapping("/create")
    public ResponseEntity<?> createFile(@RequestParam String initalPath, @Valid @RequestBody CreateFileEntityDto file) {
        return fileSystemEntityService.createFile(file, initalPath);
    }

    @PutMapping("/rename/{id}")
    public ResponseEntity<?> renameFile(@PathVariable Long id, @Valid @RequestBody EditFileEntityDto editedFile) {
        return fileSystemEntityService.renameFile(id, editedFile.getName());
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteFile(@PathVariable Long id) {
        return fileSystemEntityService.deleteFile(id);
    }

    @GetMapping("/find-all")
    public ResponseEntity<?> getAll() {
        return fileSystemEntityService.findAll();
    }

    @GetMapping("/find-files-by-parent-id/{parentId}")
    public ResponseEntity<?> findFilesByParentId(@PathVariable Long parentId) {
        return fileSystemEntityService.findFilesByParentId(parentId);
    }

    @GetMapping("/find-files-by-parent-path")
    public ResponseEntity<?> findFilesByParentPath(@RequestParam String path) {
        return fileSystemEntityService.findFilesByParentPath(path);
    }

    @GetMapping("/find-by-path")
    public ResponseEntity<?> findFileByPath(@RequestParam String path) {
        return fileSystemEntityService.findFileByPath(path);
    }

    @GetMapping("/find-by-id/{fileId}")
    public ResponseEntity<?> findFileById(@PathVariable Long fileId) {
        return fileSystemEntityService.findFileId(fileId);
    }
}
