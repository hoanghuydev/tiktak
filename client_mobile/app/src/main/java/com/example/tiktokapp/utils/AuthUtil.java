package com.example.tiktokapp.utils;

import android.content.Context;
import android.content.SharedPreferences;

import com.example.tiktokapp.responseModel.APIRespone;
import com.example.tiktokapp.responseModel.User;
import com.example.tiktokapp.services.ServiceGenerator;
import com.example.tiktokapp.services.UserService;

import java.util.concurrent.CountDownLatch;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class AuthUtil {
    private static User currentUser;
    public static User getCurrentUser(Context context) {
        if (context == null) {
            throw new IllegalArgumentException("Context cannot be null");
        }
        CountDownLatch latch = new CountDownLatch(1);
        ServiceGenerator.createUserService(context).me().enqueue(new Callback<APIRespone<User>>() {
            @Override
            public void onResponse(Call<APIRespone<User>> call, Response<APIRespone<User>> response) {
                if (response.isSuccessful()) {
                    currentUser = response.body().getData();
                }
                latch.countDown();
            }

            @Override
            public void onFailure(Call<APIRespone<User>> call, Throwable t) {
                latch.countDown();
            }
        });
        try {
            latch.await();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        return currentUser;
    }
    public static boolean loggedIn(Context context) {
        if (context == null) {
            throw new IllegalArgumentException("Context cannot be null");
        }
        SharedPreferences preferences = context.getSharedPreferences("MyPreferences", Context.MODE_PRIVATE);
        String accessToken = preferences.getString("accessToken", null);
        return accessToken!= null && accessToken!="";
    }
    public static int getUserId(Context context) {
        if (context == null) {
            throw new IllegalArgumentException("Context cannot be null");
        }
        SharedPreferences preferences = context.getSharedPreferences("MyPreferences", Context.MODE_PRIVATE);
        int userId = preferences.getInt("userID", -1);
        return userId;
    }
    public static String getAccessToken(Context context) {
        if (context == null) {
            throw new IllegalArgumentException("Context cannot be null");
        }
        SharedPreferences preferences = context.getSharedPreferences("MyPreferences", Context.MODE_PRIVATE);
        return preferences.getString("accessToken", null);
    }

    public static int getUserId() {
        return 0;
    }
}
