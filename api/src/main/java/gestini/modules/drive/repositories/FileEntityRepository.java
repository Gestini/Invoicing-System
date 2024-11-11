package gestini.modules.drive.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import gestini.modules.drive.models.FileEntityModel;

@Repository
public interface FileEntityRepository extends JpaRepository<FileEntityModel, Long> {

    Optional<FileEntityModel> findByPath(String path);

    List<FileEntityModel> findByPathStartingWith(String pathPrefix);

    @Query("SELECT f FROM FileEntityModel f WHERE f.path LIKE CONCAT(:parentPath, '/%') AND f.path NOT LIKE CONCAT(:parentPath, '/%/%')")
    List<FileEntityModel> findDirectChildren(String parentPath);
}
