package HackRU24S.model;

import java.io.Serializable;

import org.springframework.data.mongodb.core.mapping.Document;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Document(collection = "task")
public class Task implements Serializable{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) 
    private String id;
    private String name;
    private String description;
    
    public Task() {}

    public Task(String name, String description) {
        this.name = name;
        this.description = description;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String toString() {
        return "Id: " + id + " Name: " + name + " Description: " + description;
    }
}
