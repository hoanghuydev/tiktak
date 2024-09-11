package com.example.tiktokapp.requestModel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@AllArgsConstructor
@RequiredArgsConstructor
public class SignUpReq {
    private String userName;
    private String password;
    private String email;
    private String fullName;
}
