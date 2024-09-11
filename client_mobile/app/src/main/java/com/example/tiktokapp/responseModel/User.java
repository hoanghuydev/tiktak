package com.example.tiktokapp.responseModel;

import java.io.Serializable;
import java.sql.Timestamp;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@AllArgsConstructor
@RequiredArgsConstructor
public class User implements Serializable  {
    private int id;
    private Timestamp createdAt;
    private Timestamp updatedAt;
    private String userName;
    private String fullName;
    private String peerId;
    private String accessToken;
    private String email;
    private String password;
    private String association;
    private Avatar avatarData;
    private Role roleData;
    private int followers;
    private int followings;

}
