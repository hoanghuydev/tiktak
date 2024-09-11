package com.example.tiktokapp.utils;

import android.content.Context;
import android.content.SharedPreferences;

public class SharePreferncesUtil {

    public static boolean isLike(Context context,String id) {
        SharedPreferences sharedPreferences = context.getSharedPreferences("LIKED_POSTS", Context.MODE_PRIVATE);
        return sharedPreferences.contains(id);
    }
    public static void like(Context context,String id) {
        SharedPreferences sharedPreferences = context.getSharedPreferences("LIKED_POSTS", Context.MODE_PRIVATE);
        SharedPreferences.Editor editor = sharedPreferences.edit();
        editor.putBoolean(id,true);
        editor.apply();

    }
    public static void unlike(Context context,String id) {
        SharedPreferences sharedPreferences = context.getSharedPreferences("LIKED_POSTS", Context.MODE_PRIVATE);
        SharedPreferences.Editor editor = sharedPreferences.edit();
        editor.remove(id);
        editor.apply();

    }

    public static int getUserID(Context context) {
        SharedPreferences preferences = context.getSharedPreferences("MyPreferences", Context.MODE_PRIVATE);
        return preferences.getInt("userID", -1); // Retrieve user ID
    }

    public static String getAvatar(Context context) {
        SharedPreferences preferences = context.getSharedPreferences("MyPreferences", Context.MODE_PRIVATE);
        return preferences.getString("avatar", ""); // Retrieve user ID
    }

}
