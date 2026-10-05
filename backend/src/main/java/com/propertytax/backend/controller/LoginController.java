package com.propertytax.backend.controller;

import com.propertytax.backend.entity.LoginRequest;
import com.propertytax.backend.entity.LoginResponse;
import com.propertytax.backend.entity.User;
import com.propertytax.backend.service.UserService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class LoginController {

    private final UserService userService;

    public LoginController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {

        for (User user : userService.getAllUsers()) {

            if (user.getEmail().equals(request.getEmail())
                    && user.getPassword().equals(request.getPassword())) {

                return ResponseEntity.ok(
                        new LoginResponse(
                                user.getUserId(),
                                user.getName(),
                                user.getEmail(),
                                user.getRole()
                        )
                );
            }
        }

        return ResponseEntity
                .status(401)
                .body("Invalid email or password");
    }
}