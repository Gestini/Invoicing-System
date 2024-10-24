package gestini.modules.drive.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import gestini.modules.drive.models.FileEntityModel;

import java.util.Optional;
import java.util.List;

@Repository
public interface FileEntityRepository extends JpaRepository<FileEntityModel, Long> {

    Optional<FileEntityModel> findByPath(String path);

    List<FileEntityModel> findByPathStartingWith(String pathPrefix);

    @Query("SELECT f FROM FileEntityModel f WHERE f.path LIKE CONCAT(:parentPath, '/%') AND f.path NOT LIKE CONCAT(:parentPath, '/%/%')")
    List<FileEntityModel> findDirectChildren(@Param("parentPath") String parentPath);
}
