package com.example.tiktokapp.responseModel;
import com.google.gson.annotations.SerializedName;

import java.sql.Timestamp;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@AllArgsConstructor
@RequiredArgsConstructor
public class Comment{
    private int id;
    private Timestamp createdAt;
    private Timestamp updatedAt;
    private int commenter;
    private int postId;
    private String content;
    private int likes;
    @SerializedName("isLiked")
    private int isLiked;
    private User commenterData;


}
