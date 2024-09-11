package com.example.tiktokapp.requestModel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@AllArgsConstructor
@RequiredArgsConstructor
public class LoginReq {
    private String emailOrUsername;
    private String password;
}
