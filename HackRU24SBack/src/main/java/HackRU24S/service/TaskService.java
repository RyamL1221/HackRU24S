package HackRU24S.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import HackRU24S.exception.TaskNotFoundException;
import HackRU24S.model.Task;
import HackRU24S.repo.TaskRepo;
import jakarta.transaction.Transactional;

@Service
@Transactional
public class TaskService {
    
    private final TaskRepo taskRepo;

    @Autowired
    public TaskService(TaskRepo taskRepo) {
        this.taskRepo = taskRepo;
    }

    public Task addTask(Task task) {
        return taskRepo.save(task);
    }

    public List<Task> findAllTasks() {
        return taskRepo.findAll();
    }

    public Task updateTask(Task task) {
        return taskRepo.save(task);
    }

    public Task findTaskById(Long id) {
        return taskRepo.findTaskById(id)
            .orElseThrow(() -> new TaskNotFoundException());
    }

    public void deleteTask(Long id) {
        taskRepo.deleteTaskById(id);
    }
}
