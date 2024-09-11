package com.example.tiktokapp.activity;

import android.app.ProgressDialog;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.util.Log;
import android.widget.ImageView;
import android.widget.Toast;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

import com.bumptech.glide.Glide;
import com.example.tiktokapp.R;
import com.example.tiktokapp.responseModel.APIRespone;
import com.example.tiktokapp.responseModel.User;
import com.example.tiktokapp.services.ServiceGenerator;
import com.example.tiktokapp.utils.IntentUtil;
import com.google.android.material.button.MaterialButton;

import java.io.File;

import okhttp3.MediaType;
import okhttp3.MultipartBody;
import okhttp3.RequestBody;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class UploadAvatarActivity extends AppCompatActivity {

    ImageView previewImage;
    MaterialButton upload, cancel;

    private File imageFile;
    private int visibility=1;
    private SharedPreferences preferences;
    private ProgressDialog mProgressDialog;
    int userID;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_upload_avatar);
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main), (v, insets) -> {
            Insets systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars());
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom);
            return insets;
        });

        previewImage = findViewById(R.id.uploadImagePreview);
        preferences = getSharedPreferences("MyPreferences",MODE_PRIVATE);
        userID = preferences.getInt("userID", -1);
        upload = findViewById(R.id.btnUploadImage);
        cancel = findViewById(R.id.btnCancelImage);
        cancel.setOnClickListener(v -> {
            onBackPressed();
        });
        loadAvatar();
        init();
    }

    private void init() {
        mProgressDialog = new ProgressDialog(this);
        mProgressDialog.setMessage("Uploading...");
        upload.setOnClickListener(v -> {
            mProgressDialog.show();
            RequestBody requestFile = RequestBody.create(MediaType.parse("multipart/form-data"), imageFile);
            MultipartBody.Part body = MultipartBody.Part.createFormData("avatar", imageFile.getName(), requestFile);

            ServiceGenerator.createUserService(this).updateAvatar(userID,body).enqueue(new Callback<APIRespone<User>>() {
                @Override
                public void onResponse(Call<APIRespone<User>> call, Response<APIRespone<User>> response) {
                    mProgressDialog.dismiss();
                    if (response.isSuccessful()) {
                        Toast.makeText(UploadAvatarActivity.this, "Avatar uploaded successfully", Toast.LENGTH_SHORT).show();
                        IntentUtil.changeActivity(UploadAvatarActivity.this, EditProfileActivity.class);
                        finish();
                    } else {
                        Toast.makeText(UploadAvatarActivity.this, "Error uploading avatar", Toast.LENGTH_SHORT).show();
                        Log.d("Avatar error", "onResponse: " + response.message());
                    }
                }

                @Override
                public void onFailure(Call<APIRespone<User>> call, Throwable t) {
                    mProgressDialog.dismiss();
                    Toast.makeText(UploadAvatarActivity.this, "Failed to upload avatar: " + t.getMessage(), Toast.LENGTH_SHORT).show();

                }
            });
        });
    }

    private void loadAvatar() {
        Intent intent = getIntent();
            String imagePath = intent.getStringExtra("image_path");
            imageFile = new File(imagePath);
            Glide.with(this).load(imageFile).into(previewImage);
        }
}