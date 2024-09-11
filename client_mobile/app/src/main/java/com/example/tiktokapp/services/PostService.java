package com.example.tiktokapp.services;

import com.example.tiktokapp.responseModel.APIRespone;
import com.example.tiktokapp.responseModel.APIResponeList;
import com.example.tiktokapp.responseModel.FollowAPIRespone;
import com.example.tiktokapp.responseModel.Post;
import com.example.tiktokapp.responseModel.SimpleAPIRespone;

import okhttp3.MultipartBody;
import okhttp3.RequestBody;
import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Headers;
import retrofit2.http.Multipart;
import retrofit2.http.POST;
import retrofit2.http.Part;
import retrofit2.http.Path;

public interface PostService {

    @GET("post")
    Call<APIResponeList<Post>> getPosts();

    @POST("post/like/{postId}")
    Call<SimpleAPIRespone> likePost(@Path("postId") int postId);

    @GET("post/user/{userId}")
    Call<APIResponeList<Post>> getPostsByUserId(@Path("userId") int userId);

    @POST("post/unlike/{postId}")
    Call<SimpleAPIRespone> unlikePost(@Path("postId") int postId);

    @Multipart
    @POST("post/upload")
    Call<APIRespone<Post>> uploadPost(@Part("title") RequestBody title,
                                      @Part("visibility") RequestBody visibility,
                                      @Part MultipartBody.Part video
                                      );

    @Multipart
    @POST("post/upload")
    Call<APIRespone<Post>> uploadPostWithThumbnail(
                                        @Part("title") RequestBody title,
                                        @Part("visibility") RequestBody visibility,
                                        @Part MultipartBody.Part video,
                                        @Part MultipartBody.Part thumnail
    );

    @GET("post/{postId}")
    Call<APIRespone<Post>> getPostById(@Path("postId") int postId);
}
