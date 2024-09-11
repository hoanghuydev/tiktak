package com.example.tiktokapp.fragment;

import static android.content.Context.MODE_PRIVATE;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.net.Uri;
import android.os.Bundle;

import androidx.constraintlayout.widget.ConstraintLayout;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentManager;
import androidx.fragment.app.FragmentTransaction;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.Toast;

import com.bumptech.glide.Glide;
import com.example.tiktokapp.Constant;
import com.example.tiktokapp.R;
import com.example.tiktokapp.activity.ChooseFileActivity;
import com.example.tiktokapp.activity.EditProfileActivity;
import com.example.tiktokapp.activity.HomeActivity;
import com.example.tiktokapp.activity.LoginActivity;
import com.example.tiktokapp.activity.ViewFollowActivity;
import com.example.tiktokapp.responseModel.APIRespone;
import com.example.tiktokapp.responseModel.APIResponeList;
import com.example.tiktokapp.responseModel.Post;
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

public class ProfileInfoFragment extends Fragment {
    private CircleImageView avatar;
    private TextView username,followingCount,followerCount;
    private MaterialButton btnLogout, editProfile;
    private SharedPreferences preferences;
    private SharedPreferences.Editor editor;
    private ConstraintLayout layoutFollowing,layoutFollower;

    View view;
    private LinearLayout layoutListVideo;
    private int userId;
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        userId = AuthUtil.getUserId(getContext());
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        view = inflater.inflate(R.layout.fragment_profile_info, container, false);
        avatar = view.findViewById(R.id.avatar);

//        avatar.setOnClickListener(v -> {
//            Bundle bundle = new Bundle();
//            bundle.putInt("requestCode", Constant.REQUEST_GET_IMAGE_EDIT_AVATAR);
//            IntentUtil.changeActivityWithData(view.getContext(), ChooseFileActivity.class,bundle);
//        });
        followingCount = view.findViewById(R.id.followingCount);
        layoutFollowing = view.findViewById(R.id.layoutFollowing);
        layoutFollower = view.findViewById(R.id.layoutFollower);
        followerCount = view.findViewById(R.id.followerCount);
        username = view.findViewById(R.id.username);
        preferences = view.getContext().getSharedPreferences("MyPreferences", MODE_PRIVATE);
        editProfile = view.findViewById(R.id.editProfile);

        editor = preferences.edit();
        btnLogout = view.findViewById(R.id.btnLogout);
        btnLogout.setOnClickListener(v -> {
            editor.clear();
            editor.commit();
            IntentUtil.changeActivity(view.getContext(), HomeActivity.class);
        });

        editProfile.setOnClickListener(v -> {
            IntentUtil.changeActivity(view.getContext(), EditProfileActivity.class);
        });
        getMyInfo(view.getContext(),view);
        addPreviewPostFragment();
        return view;
    }

    @Override
    public void onStart() {
        super.onStart();
        getMyInfo(getContext(), view);
    }

    private void addPreviewPostFragment() {
        PreviewFileFragment previewFileFragment = new PreviewFileFragment();
        Bundle bundle = new Bundle();
        bundle.putInt("requestCode", Constant.REQUEST_POST_LIST_FOR_PROFILE);
        bundle.putInt("userId", userId);
        previewFileFragment.setArguments(bundle);
        FragmentManager fragmentManager = getActivity().getSupportFragmentManager();
        FragmentTransaction fragmentTransaction = fragmentManager.beginTransaction();
        fragmentTransaction.replace(R.id.layout_list_video, previewFileFragment);
        fragmentTransaction.commit();
    }
    private void getMyInfo(Context context,View view) {
        ServiceGenerator.createUserService(context).getProfile(userId).enqueue(new Callback<APIRespone<User>>() {
            @Override
            public void onResponse(Call<APIRespone<User>> call, Response<APIRespone<User>> response) {
                if (response.isSuccessful()) {
                    APIRespone<User> apiResponse = response.body();
                    User user = apiResponse.getData();
                    Uri avatarUri = Uri.parse(user.getAvatarData().getUrl().toString());
                    Glide.with(view.getContext())
                            .load(avatarUri)
                            .into(avatar);
                    username.setText(user.getUserName());
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