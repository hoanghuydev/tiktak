package com.example.tiktokapp.activity;

import android.Manifest;
import android.content.Context;
import android.content.pm.PackageManager;
import android.os.Build;
import android.os.Bundle;
import android.view.Window;
import android.view.WindowManager;
import android.widget.ImageButton;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.constraintlayout.widget.ConstraintLayout;

import com.example.tiktokapp.Constant;
import com.example.tiktokapp.R;
import com.example.tiktokapp.callback.Callback;
import com.example.tiktokapp.utils.AuthUtil;
import com.example.tiktokapp.utils.IntentUtil;
import com.example.tiktokapp.utils.PermissionUtil;

public class BaseActivity extends AppCompatActivity {
    private ImageButton uploadButton;
    private ConstraintLayout profileTab;
    private ConstraintLayout homeTab;

    protected void initNavbar(Context context) {
        Window window = getWindow();
        window.clearFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_NAVIGATION);
        window.addFlags(WindowManager.LayoutParams.FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS);
        window.setNavigationBarColor(getResources().getColor(android.R.color.black));
        // Run sound disk
        uploadButton = findViewById(R.id.btnUpload);
        uploadButton.setOnClickListener(v -> {
            Callback callback = new Callback() {
                @Override
                public void onSuccess(Context context) {
                    super.onSuccess(context);
                    openUploadActivity(context);
                }
            };
            String[] p;
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
                p = Constant.storage_permissions_33;
            } else {
                p = Constant.storage_permissions;
            }
            for (String permission : p) {
                PermissionUtil.requestPermissionForApp(this,callback,permission);
            }
        });
        profileTab = findViewById(R.id.profileTab);
        profileTab.setOnClickListener(v -> {
            IntentUtil.changeActivity(context, ProfileActivity.class);
            finish();
        });
        homeTab = findViewById(R.id.homeTab);
        homeTab.setOnClickListener(v -> {
            IntentUtil.changeActivity(context, HomeActivity.class);
            finish();
        });
    }
    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);

        if (grantResults.length > 0) {
            if (requestCode == Constant.REQUEST_CODE_PERMISSIONS_UPLOAD) {
                for (int i = 0; i < permissions.length; i++) {
                    if (Manifest.permission.READ_EXTERNAL_STORAGE.equals(permissions[i])) {
                        if (grantResults[i] == PackageManager.PERMISSION_GRANTED) {
                            openUploadActivity(this);
                        } else {
                            Toast.makeText(this, "Please grant storage permissions", Toast.LENGTH_SHORT).show();
                        }
                        break;
                    }
                }
            }

        }
    }
    protected void openUploadActivity(Context context) {
        if (AuthUtil.loggedIn(context)) {
            Bundle bundle = new Bundle();
            bundle.putInt("requestCode", Constant.REQUEST_CODE_GET_VIDEO_LIST);
            IntentUtil.changeActivityWithData(this, ChooseFileActivity.class,bundle);
            overridePendingTransition(R.anim.slide_up, R.anim.slide_down);
        } else {
            IntentUtil.changeActivity(this, LoginActivity.class);
        }
    }
}
