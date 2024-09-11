package com.example.tiktokapp.services;

import android.content.Context;

import com.example.tiktokapp.utils.AuthUtil;

import java.io.IOException;

import okhttp3.Interceptor;
import okhttp3.Request;
import okhttp3.Response;

public class TokenInterceptor implements Interceptor {
    private Context context;

    public TokenInterceptor(Context context) {
        this.context = context;
    }
    @Override
    public Response intercept(Chain chain) throws IOException {
        Request originalRequest = chain.request();
        Request.Builder builder = originalRequest.newBuilder();

        if (AuthUtil.loggedIn(context)) {
            builder.header("Token", AuthUtil.getAccessToken(context));
        }

        Request modifiedRequest = builder.build();
        return chain.proceed(modifiedRequest);
    }
}
