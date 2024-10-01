package productar.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import productar.models.FileEntityModel;

import java.util.Optional;
import java.util.List;

@Repository
public interface FileEntityRepository extends JpaRepository<FileEntityModel, Long> {
    
    Optional<FileEntityModel> findByPath(String path);

    List<FileEntityModel> findByPathStartingWith(String pathPrefix);
}
