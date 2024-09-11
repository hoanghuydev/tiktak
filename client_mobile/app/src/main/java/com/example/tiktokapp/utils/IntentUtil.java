package com.example.tiktokapp.utils;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;

public class IntentUtil {
    public static void changeActivity(Context context, Class<?> toActivity) {
        Intent intent = new Intent(context, toActivity);
        context.startActivity(intent);
    }
    public static void changeActivityWithRequestCode(Activity activity, Class<?> toActivity, int requestCode) {
        Intent intent = new Intent(activity, toActivity);
        activity.startActivityForResult(intent, requestCode);
    }
    public static void changeActivityAndPutString(Context context, Class<?> toActivity,String key, String value) {
        Intent intent = new Intent(context, toActivity);
        intent.putExtra(key, value);
        context.startActivity(intent);
    }
    public static void changeActivityAndPutInt(Context context, Class<?> toActivity,String key, int value) {
        Intent intent = new Intent(context, toActivity);
        Bundle bundle = new Bundle();
        bundle.putInt(key,value);
        intent.putExtras(bundle);
        context.startActivity(intent);
    }
    public static void changeActivityNoBackstack(Context context, Class<?> targetActivity) {
        Intent intent = new Intent(context, targetActivity);
        intent.setFlags(Intent.FLAG_ACTIVITY_NO_HISTORY);
        context.startActivity(intent);
    }
    public static void changeActivityWithData(Context context, Class<?> targetActivity, Bundle data) {
        Intent intent = new Intent(context, targetActivity);
        intent.putExtras(data);
        context.startActivity(intent);
    }
    public static String getStringFromIntent(Intent intent, String key) {
        return intent != null ? intent.getStringExtra(key) : null;
    }
    public static int getIntFromIntent(Intent intent, String key) {
        return intent != null ? intent.getIntExtra(key, 0) : 0;
    }
    public static boolean getBooleanFromIntent(Intent intent, String key) {
        return intent != null ? intent.getBooleanExtra(key, false) : false;
    }
    public static Bundle getBundleFromIntent(Intent intent, String key) {
        return intent != null ? intent.getBundleExtra(key) : null;
    }
}
