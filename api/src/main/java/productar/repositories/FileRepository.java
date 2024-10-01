package productar.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import productar.models.FileModel;

@Repository
public interface FileRepository extends JpaRepository<FileModel, Long> {
    @Query("SELECT file FROM FileModel file WHERE file.parent.id = :parentId")
    List<FileModel> findFilesByParentId(@Param("parentId") Long parentId);

    @Query("SELECT file FROM FileModel file WHERE file.company.id = :companyId")
    List<FileModel> findFilesByCompanyId(@Param("companyId") Long companyId);

    @Query("SELECT file FROM FileModel file WHERE file.businessUnit.id = :unitId")
    List<FileModel> findFilesByUnitId(@Param("unitId") Long unitId);
}