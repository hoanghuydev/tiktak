package com.example.tiktokapp.responseModel;
import com.google.gson.annotations.SerializedName;

import java.sql.Timestamp;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@AllArgsConstructor
@RequiredArgsConstructor

public class Post extends AbstractModel{
    private final String title;
    private int visibility;
    private final String videoUrl;
    private String videoId;
    private String thumnailUrl;
    private String thumnailId;
    private int comments;
    private int views;
    private int shares;
    private int likes;
    private int poster;
    @SerializedName("posterData")
    private User posterData;
    @SerializedName("isFollow")
    private int isFollow;
    @SerializedName("isLiked")
    private int isLiked;
    @SerializedName("isMe")
    private int isMe;
    @SerializedName("isFriend")
    private int isFriend;

}

