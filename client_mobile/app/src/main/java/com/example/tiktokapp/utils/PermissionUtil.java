package com.example.tiktokapp.utils;


import static androidx.core.app.ActivityCompat.requestPermissions;
import android.app.Activity;
import android.content.Context;
import android.content.pm.PackageManager;
import android.os.Build;

import androidx.core.content.ContextCompat;
import com.example.tiktokapp.Constant;
import com.example.tiktokapp.callback.Callback;

public class PermissionUtil {
    public static void requestPermissionForApp(Context context, Callback callback, String permission) {
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.M) {
            callback.onSuccess(context);
            return;
        }
        if (ContextCompat.checkSelfPermission((Activity)context,permission) == PackageManager.PERMISSION_GRANTED){
            callback.onSuccess(context);
        } else {
            String[] permissions = {permission};
            requestPermissions((Activity) context, permissions, Constant.REQUEST_CODE_PERMISSIONS_UPLOAD);
        }
    }
}
