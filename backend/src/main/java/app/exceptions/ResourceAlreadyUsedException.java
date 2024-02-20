package app.exceptions;

public class ResourceAlreadyUsedException extends RuntimeException {
    public ResourceAlreadyUsedException(String message) {
        super(message);
    }
}
