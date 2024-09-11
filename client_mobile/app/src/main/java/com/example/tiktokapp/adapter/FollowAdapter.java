package com.example.tiktokapp.adapter;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.graphics.Color;
import android.net.Uri;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.core.content.ContextCompat;
import androidx.recyclerview.widget.RecyclerView;

import com.bumptech.glide.Glide;
import com.example.tiktokapp.Constant;
import com.example.tiktokapp.R;
import com.example.tiktokapp.activity.LoginActivity;
import com.example.tiktokapp.activity.ProfileOtherUserActivity;
import com.example.tiktokapp.responseModel.APIRespone;
import com.example.tiktokapp.responseModel.Follow;
import com.example.tiktokapp.responseModel.Post;
import com.example.tiktokapp.responseModel.SimpleAPIRespone;
import com.example.tiktokapp.responseModel.User;
import com.example.tiktokapp.services.ServiceGenerator;
import com.example.tiktokapp.utils.AuthUtil;
import com.example.tiktokapp.utils.HttpUtil;
import com.example.tiktokapp.utils.IntentUtil;

import java.util.List;

import de.hdodenhof.circleimageview.CircleImageView;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class FollowAdapter extends RecyclerView.Adapter<FollowAdapter.FollowViewHolder> {
    private List<Follow> followList;
    private int state;
    public FollowAdapter(List<Follow> followList, int state) {
        this.followList = followList;
        this.state = state;
    }

    @NonNull
    @Override
    public FollowViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.follow_item, parent, false);
        return new FollowViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull FollowViewHolder holder, int position) {
        holder.setFollowData(followList.get(position));
    }

    public void setData(List<Follow> followList) {
        this.followList = followList;
        notifyDataSetChanged();
    }

    @Override
    public int getItemCount() {
        return followList.size();
    }


    public class FollowViewHolder extends RecyclerView.ViewHolder {
        CircleImageView avatar;
        TextView fullName, userName;
        Button btnFollow;
        LinearLayout linearLayout;
        private boolean isFollowed;

        public FollowViewHolder(@NonNull View itemView) {
            super(itemView);
            avatar = itemView.findViewById(R.id.fi_FollowImage);
            fullName = itemView.findViewById(R.id.fi_FullName);
            userName = itemView.findViewById(R.id.fi_UserName);
            btnFollow = itemView.findViewById(R.id.fi_BtnFollow);
            linearLayout = itemView.findViewById(R.id.fi_layout);
        }

        public void setFollowData(Follow follow) {
            User followData = follow.getFollowData();
            isFollowed = follow.getIsFollow()==1;
            Uri avatarUri = Uri.parse(followData.getAvatarData().getUrl());
            Glide.with(itemView.getContext())
                    .load(avatarUri)
                    .into(avatar);

            fullName.setText(followData.getFullName() + "");
            userName.setText(followData.getUserName() + "");
            avatar.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    //bấm vào để mở thông tin cá nhân của người được chọn
                    IntentUtil.changeActivityAndPutInt(itemView.getContext(), ProfileOtherUserActivity.class,"userId",followData.getId());
                }
            });
            linearLayout.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    //bấm vào để mở thông tin cá nhân của người được chọn
                    IntentUtil.changeActivityAndPutInt(itemView.getContext(), ProfileOtherUserActivity.class,"userId",followData.getId());
                }
            });
            if (follow.getIsMe() == 1) {
                btnFollow.setVisibility(View.GONE);
            }
            else if (follow.getIsFriend() == 1) {
                btnFollow.setBackgroundColor(Color.rgb(242, 242, 242));
                btnFollow.setTextColor(Color.parseColor("#000000"));
                btnFollow.setText("Friend");
            } else if (follow.getIsFollow() == 1) {
                btnFollow.setBackgroundColor(Color.rgb(242, 242, 242));
                btnFollow.setTextColor(Color.parseColor("#000000"));
                btnFollow.setText("Following");
            } else if (follow.getIsFollowee() == 1) {
                btnFollow.setBackgroundColor(Color.rgb(233, 30, 99));
                btnFollow.setTextColor(Color.parseColor("#FFFFFF"));
                btnFollow.setText("Follow");
            }

            btnFollow.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    if (AuthUtil.loggedIn(itemView.getContext())) {
                        if (isFollowed) {
                            //xử lý khi nhấn vào nút hủy follow
                            unFollow(followData, itemView.getContext());

                        } else {
                            //xử lý khi nhấn vào nút follow (-> chuyển thành unfollow)
                            follow(followData, itemView.getContext());

                        }
                    } else {
                        IntentUtil.changeActivity(itemView.getContext(), LoginActivity.class);
                        if (itemView.getContext() instanceof Activity) {
                            ((Activity) itemView.getContext()).finish();
                        }
                    }
                }
            });

        }

        private void follow(User user, Context context) {
            ServiceGenerator.createFollowService(context).follow(user.getId()).enqueue(new Callback<APIRespone<Follow>>() {
                @Override
                public void onResponse(Call<APIRespone<Follow>> call, Response<APIRespone<Follow>> response) {
                    if(response.isSuccessful()&& response!=null){
                        APIRespone<Follow> apiResponse = response.body();
                        if (apiResponse.getErr() == 0) {
                            // Xử lý khi like thành công
                            Log.i("follow", "Folow thành công");
                            btnFollow.setBackgroundColor(Color.rgb(242, 242, 242));
                            btnFollow.setTextColor(Color.parseColor("#000000"));
                            btnFollow.setText("Following");
                            isFollowed = true;
                        }
                    }
                    else{
                        try {
                            SimpleAPIRespone errResponse = HttpUtil.parseError(response, SimpleAPIRespone.class,context);
                            Toast.makeText(context, "Error: " + errResponse.getMes(), Toast.LENGTH_SHORT).show();
                        } catch (Exception e) {
                            e.printStackTrace();
                        }
                    }
                }

                @Override
                public void onFailure(Call<APIRespone<Follow>> call, Throwable t) {
                    // Xử lý khi call api thất bại
                    Toast.makeText(context, "Lỗi khi follow", Toast.LENGTH_SHORT).show();
                    Log.i("follow", "Call api thất bại");
                }
            });
        }

        private void unFollow(User user, Context context) {
            ServiceGenerator.createFollowService(context).unFollow(user.getId()).enqueue(new Callback<SimpleAPIRespone>() {
                @Override
                public void onResponse(Call<SimpleAPIRespone> call, Response<SimpleAPIRespone> response) {
                    if (response.isSuccessful()) {
                        SimpleAPIRespone apiResponse = response.body();
                        // Xử lý khi unlike thành công
                        // Cập nhật icon của cho userFollow
                        btnFollow.setBackgroundColor(Color.rgb(233, 30, 99));
                        btnFollow.setTextColor(Color.parseColor("#FFFFFF"));
                        btnFollow.setText("Follow");
                        isFollowed = false;

                    } else {
                        try {
                            SimpleAPIRespone errResponse = HttpUtil.parseError(response, SimpleAPIRespone.class,context);
                            Toast.makeText(context, "Error: " + errResponse.getMes(), Toast.LENGTH_SHORT).show();
                        } catch (Exception e) {
                            e.printStackTrace();
                        }
                    }
                }
                @Override
                public void onFailure(Call<SimpleAPIRespone> call, Throwable t) {
                    // Xử lý khi call api thất bại
                    Log.i("UnFollow", "Call api thất bại");
                }
            });
        }
    }
}
