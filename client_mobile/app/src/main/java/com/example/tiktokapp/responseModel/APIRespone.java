package com.example.tiktokapp.responseModel;

import com.google.gson.annotations.SerializedName;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@AllArgsConstructor
@RequiredArgsConstructor
public class APIRespone<T> {
    private Integer err;
    private String mes;
    @SerializedName(value = "post", alternate = {"user","follower","following","comment"})
    private T data;
    private String accessToken;
    private Pagination pagination;
}
