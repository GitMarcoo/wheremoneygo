package app.utils;

import jakarta.persistence.Id;

public interface Identifiable {
    public Long getId();
    public void setId(Long id);
}
