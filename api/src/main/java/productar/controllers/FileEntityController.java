package productar.controllers;

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

import productar.models.FileEntityModel;
import productar.services.FileEntityService;

@RestController
@RequestMapping("/files")
public class FileEntityController {

    @Autowired
    private FileEntityService fileSystemEntityService;

    @PostMapping("/create")
    public ResponseEntity<?> createFile(@RequestBody FileEntityModel file) {
        return fileSystemEntityService.createFile(file);
    }

    @PutMapping("/rename/{id}")
    public ResponseEntity<?> renameFile(@PathVariable Long id, @RequestBody FileEntityModel editedFile) {
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

    @GetMapping("/find-by-path")
    public ResponseEntity<?> findFileByPath(@RequestParam String path) {
        return fileSystemEntityService.findFileByPath(path);
    }
}
