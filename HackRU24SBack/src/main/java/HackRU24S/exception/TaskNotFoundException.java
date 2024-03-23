package HackRU24S.exception;

public class TaskNotFoundException extends RuntimeException{
    

    public TaskNotFoundException() {
        super("Task provided does not exist");
    }

    public TaskNotFoundException(String message) {
        super(message);
    }
}
