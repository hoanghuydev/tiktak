package com.example.tiktokapp.activity;

import android.content.Context;
import android.content.SharedPreferences;
import android.net.Uri;
import android.os.Bundle;
import android.view.View;
import android.widget.ImageButton;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.Toast;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.constraintlayout.widget.ConstraintLayout;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentManager;
import androidx.fragment.app.FragmentTransaction;

import com.bumptech.glide.Glide;
import com.example.tiktokapp.Constant;
import com.example.tiktokapp.R;
import com.example.tiktokapp.fragment.PreviewFileFragment;
import com.example.tiktokapp.fragment.ProfileInfoFragment;
import com.example.tiktokapp.fragment.ProfileLoginFragment;
import com.example.tiktokapp.responseModel.APIRespone;
import com.example.tiktokapp.responseModel.SimpleAPIRespone;
import com.example.tiktokapp.responseModel.User;
import com.example.tiktokapp.services.ServiceGenerator;
import com.example.tiktokapp.utils.AuthUtil;
import com.example.tiktokapp.utils.HttpUtil;
import com.example.tiktokapp.utils.IntentUtil;
import com.google.android.material.button.MaterialButton;

import de.hdodenhof.circleimageview.CircleImageView;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class ProfileOtherUserActivity extends AppCompatActivity {
    private CircleImageView avatar;
    private TextView username,followingCount,followerCount,fullName;
    private MaterialButton btnLogout;
    private int userId;
    private ImageButton btnBack;
    private ConstraintLayout layoutFollowing,layoutFollower;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_profile_other_user);
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main), (v, insets) -> {
            Insets systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars());
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom);
            return insets;
        });
        userId = getIntent().getIntExtra("userId", -1);
        avatar = findViewById(R.id.avatar);
        layoutFollowing = findViewById(R.id.layoutFollowing);
        layoutFollower = findViewById(R.id.layoutFollower);
        followingCount = findViewById(R.id.followingCount);
        followerCount = findViewById(R.id.followerCount);
        username = findViewById(R.id.username);
        fullName = findViewById(R.id.fullname);
        btnBack = findViewById(R.id.btnBack);
        btnBack.setOnClickListener(v -> onBackPressed());
        getMyInfo(this);
        addPreviewPostFragment();
    }
    private void addPreviewPostFragment() {
        PreviewFileFragment previewFileFragment = new PreviewFileFragment();
        Bundle bundle = new Bundle();
        bundle.putInt("requestCode", Constant.REQUEST_POST_LIST_FOR_PROFILE);
        bundle.putInt("userId", userId);
        previewFileFragment.setArguments(bundle);
        FragmentManager fragmentManager = this.getSupportFragmentManager();
        FragmentTransaction fragmentTransaction = fragmentManager.beginTransaction();
        fragmentTransaction.replace(R.id.layout_list_video, previewFileFragment);
        fragmentTransaction.commit();
    }
    private void getMyInfo(Context context) {
        ServiceGenerator.createUserService(context).getProfile(userId).enqueue(new Callback<APIRespone<User>>() {
            @Override
            public void onResponse(Call<APIRespone<User>> call, Response<APIRespone<User>> response) {
                if (response.isSuccessful()) {
                    APIRespone<User> apiResponse = response.body();
                    User user = apiResponse.getData();
                    Uri avatarUri = Uri.parse(user.getAvatarData().getUrl().toString());
                    Glide.with(context)
                            .load(avatarUri)
                            .into(avatar);
                    username.setText(user.getUserName());
                    fullName.setText(user.getFullName());
                    followingCount.setText(user.getFollowings()+"");
                    layoutFollowing.setOnClickListener(v -> {
                        Bundle bundle = new Bundle();
                        bundle.putInt("userId", user.getId());
                        bundle.putInt("state", Constant.STATE_GET_FOLLOWINGS);
                        IntentUtil.changeActivityWithData(context, ViewFollowActivity.class,bundle);
                    });
                    followerCount.setText(user.getFollowers()+"");
                    layoutFollower.setOnClickListener(v -> {
                        Bundle bundle = new Bundle();
                        bundle.putInt("userId", user.getId());
                        bundle.putInt("state", Constant.STATE_GET_FOLLOWERS);
                        IntentUtil.changeActivityWithData(context, ViewFollowActivity.class,bundle);
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