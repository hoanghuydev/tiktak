package com.example.tiktokapp.fragment;

import android.annotation.SuppressLint;
import android.content.Context;
import android.net.Uri;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.MotionEvent;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.FragmentManager;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.bumptech.glide.Glide;
import com.example.tiktokapp.R;
import com.example.tiktokapp.activity.HomeActivity;
import com.example.tiktokapp.activity.LoginActivity;
import com.example.tiktokapp.activity.MainActivity;
import com.example.tiktokapp.activity.SubVideoActivity;
import com.example.tiktokapp.adapter.CommentAdapter;
import com.example.tiktokapp.requestModel.CommentReq;
import com.example.tiktokapp.responseModel.APIResponeList;
import com.example.tiktokapp.responseModel.Comment;
import com.example.tiktokapp.responseModel.SimpleAPIRespone;
import com.example.tiktokapp.services.CommentService;
import com.example.tiktokapp.services.ServiceGenerator;
import com.example.tiktokapp.utils.AuthUtil;
import com.example.tiktokapp.utils.IntentUtil;
import com.example.tiktokapp.utils.SharePreferncesUtil;
import com.google.android.material.bottomsheet.BottomSheetDialogFragment;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class CommentBottomSheetFragment extends BottomSheetDialogFragment {

    private int postId;
    private TextView amountComment, edtComment;
    private RecyclerView recyclerView;
    private CommentAdapter commentAdapter;
    private List<Comment> commentList;
    private ImageView sendComment, exitComment, userAvatar;

    public CommentBottomSheetFragment(int postId) {
        this.postId = postId;
    }

    @SuppressLint("ClickableViewAccessibility")
    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.comment_bottom_sheet, container, false);

        recyclerView = view.findViewById(R.id.recyclerViewComments);
        exitComment = view.findViewById(R.id.exitComment);

        amountComment = view.findViewById(R.id.amountComment);
        edtComment = view.findViewById(R.id.editTextComment);
        sendComment = view.findViewById(R.id.sendComment);
        userAvatar = view.findViewById(R.id.userAvatar);

        recyclerView.setLayoutManager(new LinearLayoutManager(getContext()));

        int id = SharePreferncesUtil.getUserID(getContext());
        String avatar = SharePreferncesUtil.getAvatar(getContext());

        Log.d("Anh Dai Dien", "before if");
        if(!avatar.isEmpty()){
            Uri avatarUri = Uri.parse(avatar);
            Glide.with(getContext())
                    .load(avatarUri)
                    .into(userAvatar);
            Log.d("Anh Dai Dien", "in if: "+ avatar);

        }else {
            userAvatar.setImageResource(R.drawable.avatar);
            Log.d("Anh Dai Dien", "in else: ");

        }
        Log.d("USERAVATARURL", "onCreateView: " + avatar);
        commentList = new ArrayList<>();
        commentAdapter = new CommentAdapter(commentList, getContext(), id);
        recyclerView.setAdapter(commentAdapter);

        edtComment.setOnTouchListener(new View.OnTouchListener() {
            @Override
            public boolean onTouch(View v, MotionEvent event) {
                switch (event.getAction()) {
                    case MotionEvent.ACTION_DOWN:
                        if (!AuthUtil.loggedIn(getContext())) {
                            IntentUtil.changeActivity(getContext(), LoginActivity.class);
                        }
                        break;
                    case MotionEvent.ACTION_UP:

                        break;
                }
                // Return true if the listener has consumed the event, false otherwise
                return false;
            }
        });
        sendComment.setOnClickListener(v-> {
            createComment(edtComment.getText().toString());
        });

        // Fetch comments
        getComments(getContext());

        // Handle exit comment button click
        exitComment.setOnClickListener(v -> {
            dismiss();
        });

        return view;
    }

    public void createComment(String text) {

        if (!AuthUtil.loggedIn(getContext())) {
            IntentUtil.changeActivity(getContext(), LoginActivity.class);
        }

        if (text.trim().length() == 0) {
            Toast.makeText(this.getContext(), "Please insert your commment", Toast.LENGTH_SHORT).show();
            return;
        }

        CommentReq cmtReq = new CommentReq(text);
        // Call the Retrofit service to create the comment
        ServiceGenerator.createCommentService(getContext())
                .create(postId, cmtReq)
                .enqueue(new Callback<SimpleAPIRespone>() {
                    @Override
                    public void onResponse(Call<SimpleAPIRespone> call, Response<SimpleAPIRespone> response) {
                        if (response.isSuccessful() && response.body() != null) {
                            // Handle successful comment creation
                            SimpleAPIRespone apiResponse = response.body();
                            Toast.makeText(getContext(), "Comment created successfully", Toast.LENGTH_SHORT).show();
                            Log.d("ResponseCreateCMT", "onResponse: " + response.message());
                            edtComment.setText(""); // Clear the comment text field after successful creation
                            // Refresh comments after creation
                            getComments(getContext());

                        } else {
                            // Handle unsuccessful response
                            Toast.makeText(getContext(), "Failed to create comment", Toast.LENGTH_SHORT).show();
                            Log.e("CreateComment", "Failed to create comment, response: " + response.errorBody());
                        }
                    }

                    @Override
                    public void onFailure(Call<SimpleAPIRespone> call, Throwable t) {
// Handle network errors or unexpected failures
                        Toast.makeText(getContext(), "Error: " + t.getMessage(), Toast.LENGTH_SHORT).show();
                        Log.e("CreateComment", "Error creating comment", t);
                    }

                });
    }

    private void getComments(Context context) {
        ServiceGenerator.createCommentService(context).getComments(postId).enqueue(new Callback<APIResponeList<Comment>>() {
            @Override
            public void onResponse(Call<APIResponeList<Comment>> call, Response<APIResponeList<Comment>> response) {
                if (response.isSuccessful() && response.body() != null) {
                    APIResponeList<Comment> apiResponse = response.body();
                    commentList.clear(); // Clear the existing list before adding new comments
                    commentList.addAll(apiResponse.getData());
                    commentAdapter.notifyDataSetChanged();

                    amountComment.setText(commentList.size() + " Bình luận");
                    for (int i = 0; i < commentList.size(); i++) {
                        Log.d("Comments", "ID Comment " + commentList.get(i).getId());
                        Log.d("Comments", "Content: " + commentList.get(i).getContent());
                        Log.d("Comments", "Likes:" + commentList.get(i).getIsLiked());
                    }

                } else {
                    Toast.makeText(context, "Failed to load comments", Toast.LENGTH_SHORT).show();
                    Log.e("Comments", "Failed to load comments, response: " + response.errorBody());
                }
            }

            @Override
            public void onFailure(Call<APIResponeList<Comment>> call, Throwable t) {
                Toast.makeText(context, "Error: " + t.getMessage(), Toast.LENGTH_SHORT).show();
                Log.e("Comments", "Error loading comments", t);
            }
        });
    }

    @Override
    public void onDetach() {
        super.onDetach();
        Log.d("CommentBottomSheet", "run detach");

        if (getActivity() instanceof HomeActivity) {
            Log.d("CommentBottomSheet", "in home");
            ((HomeActivity) getActivity()).getPosts(getContext());
            return;
        }

        Log.d("CommentBottomSheet", "not in home");

        if (getActivity() instanceof SubVideoActivity) {
            Log.d("CommentBottomSheet", "in SubVideoActivity");
            SubVideoActivity subVideoActivity = (SubVideoActivity) getActivity();
            subVideoActivity.getPostById(subVideoActivity.postId, getContext());
            return;
        }

        Log.d("CommentBottomSheet", "not in profile");

    }
}
