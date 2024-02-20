package app.exceptions;

public class ResourceIdentifierMismatchException extends RuntimeException{
    public ResourceIdentifierMismatchException(String message) {
        super(message);
    }
}
