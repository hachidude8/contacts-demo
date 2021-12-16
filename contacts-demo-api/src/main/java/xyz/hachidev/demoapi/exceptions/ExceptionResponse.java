package xyz.hachidev.demoapi.exceptions;

import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.ArrayList;
import java.util.List;

public class ExceptionResponse {
    private Long timestamp;
    private String message;
    private List<Object> details;

    public ExceptionResponse(String message) {
        this(message, new ArrayList<>());
    }

    public ExceptionResponse(String message, List<Object> details) {
        this.timestamp = LocalDateTime.now().toEpochSecond(ZoneOffset.UTC);
        this.message = message;
        this.details = details;
    }

    public void addDetail(@NotNull Object detail) {
        details.add(detail);
    }

    public Long getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Long timestamp) {
        this.timestamp = timestamp;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public List<Object> getDetails() {
        return details;
    }

    public void setDetails(List<Object> details) {
        this.details = details;
    }
}
