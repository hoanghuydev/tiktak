package com.example.tiktokapp.utils;

import android.content.Context;

import com.example.tiktokapp.services.APIClient;

import java.io.IOException;
import java.lang.annotation.Annotation;

import okhttp3.ResponseBody;
import retrofit2.Converter;
import retrofit2.Response;

public class HttpUtil {
    public static <T> T parseError(Response<?> response, Class<T> errorClass, Context context) {
        Converter<ResponseBody, T> converter = APIClient.getClient(context).responseBodyConverter(errorClass, new Annotation[0]);

        T errorResponse;

        try {
            errorResponse = converter.convert(response.errorBody());
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
        return errorResponse;
    }

}
