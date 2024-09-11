package com.example.tiktokapp.requestModel;

public class UpdateUserInforReq {
    private String userName;
    private String fullName;

    public UpdateUserInforReq(String userName, String fullName) {
        this.userName = userName;
        this.fullName = fullName;
    }

    public String getUsername() {
        return userName;
    }

    public void setUsername(String userName) {
        this.userName = userName;
    }

    public String getFullname() {
        return fullName;
    }

    public void setFullname(String fullName) {
        this.fullName = fullName;
    }
}
