package com.example.tiktokapp.services;

import android.content.Context;

public class ServiceGenerator {
    private ServiceGenerator() {
    }
    public static PostService createPostService(Context context) {
        return APIClient.getClient(context).create(PostService.class);
    }
    public static CommentService createCommentService(Context context) {
        return APIClient.getClient(context).create(CommentService.class);
    }
    public static UserService createUserService(Context context) {
        return APIClient.getClient(context).create(UserService.class);
    }
    public static AuthService createAuthService(Context context) {
        return APIClient.getClient(context).create(AuthService.class);
    }
    public static FollowService createFollowService(Context context) {
        return APIClient.getClient(context).create(FollowService.class);
    }
}
