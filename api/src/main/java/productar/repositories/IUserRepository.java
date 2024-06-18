package productar.repositories;

import java.util.ArrayList;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import productar.models.UserModel;

@Repository
public interface IUserRepository extends JpaRepository<UserModel, Long> {

    



}
