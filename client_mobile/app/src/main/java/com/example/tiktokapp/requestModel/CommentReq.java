package com.example.tiktokapp.requestModel;

public class CommentReq {
    private String content;

    public CommentReq(String content) {
        this.content = content;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}
