package xyz.hachidev.demoapi.exceptions.handlers;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;
import xyz.hachidev.demoapi.exceptions.ExceptionResponse;

import javax.validation.ConstraintViolationException;
import java.util.HashMap;
import java.util.Map;


@ControllerAdvice
public class RestExceptionResponseAdvice extends ResponseEntityExceptionHandler {

    @ExceptionHandler(value = {RuntimeException.class})
    public ResponseEntity<Object> handleGeneralExceptions(RuntimeException ex, WebRequest request) {
        ExceptionResponse response = new ExceptionResponse(ex.getMessage());
        return handleExceptionInternal(ex, response, new HttpHeaders(), HttpStatus.INTERNAL_SERVER_ERROR, request);
    }

    @ExceptionHandler(value = {AuthenticationException.class})
    public ResponseEntity<Object> handleAuthenticationExceptions(RuntimeException ex, WebRequest request) {
        ExceptionResponse response = new ExceptionResponse(ex.getMessage());
        return handleExceptionInternal(ex, response, new HttpHeaders(), HttpStatus.UNAUTHORIZED, request);
    }

    @ExceptionHandler(value = {ConstraintViolationException.class})
    public ResponseEntity<Object> handleValidationExceptions(ConstraintViolationException ex, WebRequest request) {
        ExceptionResponse response = new ExceptionResponse("One or more fields are invalid");
        ex.getConstraintViolations().forEach(c -> {
            Map<String, String> validation = new HashMap<>();
            validation.put("path", c.getPropertyPath().toString());
            validation.put("message", c.getMessage());
            response.addDetail(validation);
        });
        return handleExceptionInternal(ex, response, new HttpHeaders(), HttpStatus.UNPROCESSABLE_ENTITY, request);
    }


}
