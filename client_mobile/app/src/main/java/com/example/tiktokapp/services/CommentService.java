package com.example.tiktokapp.services;

import com.example.tiktokapp.requestModel.CommentReq;
import com.example.tiktokapp.responseModel.APIResponeList;
import com.example.tiktokapp.responseModel.Comment;
import com.example.tiktokapp.responseModel.SimpleAPIRespone;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.DELETE;
import retrofit2.http.GET;
import retrofit2.http.POST;
import retrofit2.http.PUT;
import retrofit2.http.Path;

public interface CommentService {

    @GET("comment/post/{postId}")
    Call<APIResponeList<Comment>> getComments(@Path("postId") int postId);

    @POST("comment/{commentId}/like")
    Call<SimpleAPIRespone> likesComment(@Path("commentId") int commentId);

    @POST("comment/{commentId}/unlike")
    Call<SimpleAPIRespone> unlikeComment(@Path("commentId") int commentId);

    @DELETE("comment/{commentId}")
    Call<SimpleAPIRespone> delete(@Path("commentId") int commentId);

    @POST("comment/post/{postId}")
    Call<SimpleAPIRespone> create(@Path("postId") int postId, @Body CommentReq commentReq);

    @PUT("comment/{commentId}/edit")
    Call<SimpleAPIRespone> edit(@Path("commentId") int commentId, @Body CommentReq commentReq);
}
