package com.propertytax.backend.entity;

public class LoginResponse {

    private Integer userId;
    private String name;
    private String email;
    private String role;

    public LoginResponse(Integer userId, String name, String email, String role) {
        this.userId = userId;
        this.name = name;
        this.email = email;
        this.role = role;
    }

    public Integer getUserId() {
        return userId;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public String getRole() {
        return role;
    }
}