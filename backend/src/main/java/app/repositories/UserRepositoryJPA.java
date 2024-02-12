package app.repositories;

import app.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository("userRepositoryJPA")
public interface UserRepositoryJPA extends JpaRepository<User, Long> {
}
