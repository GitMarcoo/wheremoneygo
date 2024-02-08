package app.models;

import app.utils.Identifiable;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class Expense implements Identifiable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private TimeInterval timeInterval;

    private double amount;

    LocalDateTime start;

    LocalDateTime end;

    public Expense() {}

    @PrePersist
    protected void onCreate() {
        start = LocalDateTime.now(); // Set start to current time before persisting
    }

    public String getName() {
        return name;
    }

    public TimeInterval getTimeInterval() {
        return timeInterval;
    }

    public double getAmount() {
        return amount;
    }

    public LocalDateTime getStart() {
        return start;
    }

    public LocalDateTime getEnd() {
        return end;
    }

    @Override
    public Long getId() {
        return id;
    }

    @Override
    public void setId(Long id) {
        this.id = id;
    }

    public void setTimeInterval(TimeInterval timeInterval) {
        this.timeInterval = timeInterval;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public void setStart(LocalDateTime start) {
        this.start = start;
    }

    public void setEnd(LocalDateTime end) {
        this.end = end;
    }
}
