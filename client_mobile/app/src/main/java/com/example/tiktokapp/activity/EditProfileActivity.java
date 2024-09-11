package com.example.tiktokapp.activity;

import android.content.ClipData;
import android.content.ClipboardManager;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.net.Uri;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

import com.bumptech.glide.Glide;
import com.example.tiktokapp.Constant;
import com.example.tiktokapp.R;
import com.example.tiktokapp.responseModel.APIRespone;
import com.example.tiktokapp.responseModel.SimpleAPIRespone;
import com.example.tiktokapp.responseModel.User;
import com.example.tiktokapp.services.ServiceGenerator;
import com.example.tiktokapp.utils.AuthUtil;
import com.example.tiktokapp.utils.HttpUtil;
import com.example.tiktokapp.utils.IntentUtil;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class EditProfileActivity extends AppCompatActivity {
    private ImageView avatar, btnBack, camera;
    private TextView txtUsername, tiktokID, copyID;

    private String username, fullname, avt;
    private int userID;
    private android.widget.Toast Toast;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_edit_profile);
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main), (v, insets) -> {
            Insets systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars());
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom);
            return insets;
        });
        userID = AuthUtil.getUserId(this);
        avatar = findViewById(R.id.userAvatar);
        txtUsername = findViewById(R.id.nameOfUser);
        tiktokID = findViewById(R.id.tiktokID);
        btnBack = findViewById(R.id.btnBack);
        copyID = findViewById(R.id.copyID);
        camera =findViewById(R.id.camera);
        txtUsername.setText(fullname);
        tiktokID.setText(username);
        copyID.setText(username);
        getMyInfo(this);


        camera.setOnClickListener(v-> {
            openUploadActivity(this);
        });

        btnBack.setOnClickListener(v -> {
            finish();
        });

        copyID.setOnClickListener(v -> {
            copyID(username);
        });
    }

    @Override
    protected void onResume() {
        super.onResume();
        // Reload preferences in case they have been updated
    }



    public void copyID(String tiktokID) {
        ClipboardManager clipboard = (ClipboardManager) getSystemService(this.CLIPBOARD_SERVICE);
        ClipData clip = ClipData.newPlainText("TikTok ID", tiktokID);
        clipboard.setPrimaryClip(clip);

        // Show a Toast message to inform the user that the ID has been copied
        Toast.makeText(this, "TikTok ID copied to clipboard", Toast.LENGTH_SHORT).show();
    }

    protected void openUploadActivity(Context context) {
        if (AuthUtil.loggedIn(context)) {
            Bundle bundle = new Bundle();
            bundle.putInt("requestCode", Constant.REQUEST_GET_IMAGE_EDIT_AVATAR);
            IntentUtil.changeActivityWithData(this, ChooseFileActivity.class,bundle);
            finish();
            overridePendingTransition(R.anim.slide_up, R.anim.slide_down);
        } else {
            IntentUtil.changeActivity(this, LoginActivity.class);
        }
    }
    private void getMyInfo(Context context) {
        ServiceGenerator.createUserService(context).getProfile(userID).enqueue(new Callback<APIRespone<User>>() {
            @Override
            public void onResponse(Call<APIRespone<User>> call, Response<APIRespone<User>> response) {
                if (response.isSuccessful()) {
                    APIRespone<User> apiResponse = response.body();
                    User user = apiResponse.getData();
                    Uri avatarUri = Uri.parse(user.getAvatarData().getUrl().toString());
                    Glide.with(context)
                            .load(avatarUri)
                            .into(avatar);
                    username = user.getUserName();
                    fullname = user.getFullName();
                    avt = user.getAvatarData().getUrl().toString();
                    txtUsername.setText(fullname);
                    tiktokID.setText(username);
                    copyID.setText(username);
                    txtUsername.setOnClickListener(v -> {
                        Intent intent = new Intent(context, EditInforActivity.class);
                        intent.putExtra("title", "Tên");
                        intent.putExtra("method", true);
                        intent.putExtra("id", userID);
                        intent.putExtra("fullname", fullname);
                        intent.putExtra("username", username);
                        intent.putExtra("subline", "Tên");
                        startActivity(intent);
                        finish();
                    });

                    tiktokID.setOnClickListener(v -> {
                        Intent intent = new Intent(context, EditInforActivity.class);
                        intent.putExtra("title", "Tiktok ID");
                        intent.putExtra("method", false);
                        intent.putExtra("id", userID);
                        intent.putExtra("fullname", fullname);
                        intent.putExtra("username", username);
                        intent.putExtra("subline", "www.tiktok.com/@" + username);
                        startActivity(intent);
                        finish();
                    });
                }else {
                    try {
                        SimpleAPIRespone errResponse = HttpUtil.parseError(response, SimpleAPIRespone.class,context);
                        Toast.makeText(context, "Error: " + errResponse.getMes(), Toast.LENGTH_SHORT).show();
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                }
            }

            @Override
            public void onFailure(Call<APIRespone<User>> call, Throwable t) {
                Toast.makeText(context, t.getMessage(), Toast.LENGTH_SHORT).show();
            }
        });
    }
}
