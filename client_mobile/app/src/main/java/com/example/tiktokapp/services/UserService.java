package com.example.tiktokapp.services;

import com.example.tiktokapp.requestModel.CommentReq;
import com.example.tiktokapp.requestModel.UpdateUserInforReq;
import com.example.tiktokapp.responseModel.APIRespone;
import com.example.tiktokapp.responseModel.Follow;
import com.example.tiktokapp.responseModel.FollowAPIRespone;
import com.example.tiktokapp.responseModel.SimpleAPIRespone;
import com.example.tiktokapp.responseModel.User;

import okhttp3.MultipartBody;
import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.Headers;
import retrofit2.http.Multipart;
import retrofit2.http.POST;
import retrofit2.http.PUT;
import retrofit2.http.Part;
import retrofit2.http.Path;

public interface UserService {
    @GET("user/me")
    Call<APIRespone<User>> me();

    @PUT("user/{userId}")
    Call<APIRespone<User>> updateUser(@Path("userId")int userId, @Body UpdateUserInforReq inforReq);

    @Multipart
    @POST("user/avatar/{userId}")
    Call<APIRespone<User>> updateAvatar(@Path("userId") int userId, @Part MultipartBody.Part avatar);

    @GET("user/profile/{userId}")
    Call<APIRespone<User>> getProfile(@Path("userId") int userId);
}
