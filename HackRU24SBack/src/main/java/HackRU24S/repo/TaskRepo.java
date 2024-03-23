package HackRU24S.repo;

import org.springframework.stereotype.Repository;

import HackRU24S.model.Task;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

@Repository
public interface TaskRepo extends MongoRepository<Task, Long>{
    
    Optional<Task> findTaskById(Long id);
    void deleteTaskById();
    
}
