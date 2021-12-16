package xyz.hachidev.demoapi.auth.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController()
public class ConnectionController {

    @GetMapping("/manage/conn")
    public ResponseEntity<Object> test() {
        Map<String, String> response = new HashMap<>();
        response.put("message", "API is working");
        return ResponseEntity.ok(response);
    }
}
