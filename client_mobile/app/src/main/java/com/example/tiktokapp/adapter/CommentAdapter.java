package com.example.tiktokapp.adapter;

import android.app.Dialog;
import android.content.Context;
import android.net.Uri;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.constraintlayout.widget.ConstraintLayout;
import androidx.recyclerview.widget.RecyclerView;

import com.bumptech.glide.Glide;
import com.example.tiktokapp.R;
import com.example.tiktokapp.activity.LoginActivity;
import com.example.tiktokapp.requestModel.CommentReq;
import com.example.tiktokapp.responseModel.Comment;
import com.example.tiktokapp.responseModel.Post;
import com.example.tiktokapp.responseModel.SimpleAPIRespone;
import com.example.tiktokapp.services.ServiceGenerator;
import com.example.tiktokapp.utils.AuthUtil;
import com.example.tiktokapp.utils.HttpUtil;
import com.example.tiktokapp.utils.IntentUtil;

import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class CommentAdapter extends RecyclerView.Adapter<CommentAdapter.CommentViewHolder> {

    private static boolean isLiked;
    private Context context;

    private static List<Comment> commentList;
    private int id;

    public CommentAdapter(List<Comment> commentList, Context context, int id
    ) {
        this.commentList = commentList;
        this.context = context;
        this.id = id;
    }

    @NonNull
    @Override
    public CommentViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.layout_comment_item, parent, false);
        return new CommentViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull CommentViewHolder holder, int position) {
        holder.bind(commentList.get(position), id);
    }

    @Override
    public int getItemCount() {
        return commentList.size();
    }

    public void setData(List<Comment> commentList) {
        this.commentList = commentList;
        notifyDataSetChanged();
    }

    class CommentViewHolder extends RecyclerView.ViewHolder {

        private TextView commentUserName, commentContent, amountCommentLike, commentTimestamp;
        private ImageView avatarCommenter, likeComment;
        private ConstraintLayout cmtLayout;

        public CommentViewHolder(@NonNull View itemView) {
            super(itemView);
            avatarCommenter = itemView.findViewById(R.id.commenterAvatar);
            commentUserName = itemView.findViewById(R.id.commenterUsername);
            commentContent = itemView.findViewById(R.id.commentContent);
            likeComment = itemView.findViewById(R.id.likeComment);
            amountCommentLike = itemView.findViewById(R.id.amountCommentLike);
            commentTimestamp = itemView.findViewById(R.id.commentTimestamp);
            cmtLayout = itemView.findViewById(R.id.commentItem);
        }

        public void bind(Comment comment, int id) {
            // Set avatar
            String link = comment.getCommenterData().getAvatarData().getUrl().toString();
            Uri avatarUri = Uri.parse(link);
            Glide.with(itemView.getContext())
                    .load(avatarUri)
                    .into(avatarCommenter);

            commentUserName.setText(comment.getCommenterData().getUserName());
            commentContent.setText(comment.getContent());
            amountCommentLike.setText(String.valueOf(comment.getLikes()));
            commentTimestamp.setText(comment.getCreatedAt().toString());

            if (comment.getCommenterData().getId() == id) {
                cmtLayout.setOnLongClickListener(v -> {
                    Dialog dialog = new Dialog(v.getContext());
                    dialog.setContentView(R.layout.comment_change_dialog);

                    TextView edit = dialog.findViewById(R.id.editComment);
                    TextView delete = dialog.findViewById(R.id.deleteComment);

                    edit.setOnClickListener(view -> {

                        dialog.dismiss();
                        // Create dialog for editing comment
                        Dialog editDialog = new Dialog(itemView.getContext());
                        editDialog.setContentView(R.layout.comment_edit_dialog);

                        EditText editCommentText = editDialog.findViewById(R.id.editCommentText);
                        Button saveButton = editDialog.findViewById(R.id.saveButton);
                        Button cancelButton = editDialog.findViewById(R.id.cancelButton);

                        // Pre-fill the edit text with current comment content
                        editCommentText.setText(comment.getContent());

                        saveButton.setOnClickListener(saveView -> {
                            String newCommentContent = editCommentText.getText().toString().trim();
                            if (!newCommentContent.isEmpty()) {
                                // Update comment locally (optional for immediate UI feedback)
                                comment.setContent(newCommentContent);
                                commentContent.setText(newCommentContent); // Update UI immediately

                                // Call API to update comment on server
                                updateComment(comment, newCommentContent, itemView.getContext());

                                editDialog.dismiss();
                            } else {
                                Toast.makeText(itemView.getContext(), "Comment cannot be empty", Toast.LENGTH_SHORT).show();
                            }
                        });

                        cancelButton.setOnClickListener(cancelView -> editDialog.dismiss());

                        editDialog.show();
                    });


                    delete.setOnClickListener(view -> {
                        deleteComment(comment, context, commentList);
                        dialog.dismiss();

                    });
                    dialog.show();
                    return false;
                });
            }

            // Set initial like status
            isLiked = comment.getIsLiked() == 1;
            Log.d("LOGERROR 1", "bind: " + isLiked);
            updateLikeButtonUI();
            Log.d("LOGERROR 2", "bind: " + isLiked);

            // Handle like/unlike button click
            likeComment.setOnClickListener(v -> {
                Log.d("LOGERROR 3", "bind: " + isLiked);

                if (!AuthUtil.loggedIn(itemView.getContext())) {
                    IntentUtil.changeActivity(itemView.getContext(), LoginActivity.class);
                } else {
                    Log.d("LOGERROR 4", "bind: " + isLiked);

                    if (isLiked) {
                        unlikeComment(comment, itemView.getContext());
                        Log.d("LOGERROR 5", "bind: " + isLiked);
                    } else {
                        likeComment(comment, itemView.getContext());
                        Log.d("LOGERROR 6", "bind: " + isLiked);

                    }
                    // Toggle isLiked state after action
                    updateLikeButtonUI();
                    isLiked = !isLiked;
                }
            });
        }

        // Method to update UI of like button based on isLiked state
        private void updateLikeButtonUI() {
            if (isLiked) {
                likeComment.setImageResource(R.drawable.baseline_favorite_bolder_24); // Use your filled heart drawable
                likeComment.setColorFilter(0xfffc1605); // Optional: Set tint color
            } else {
                likeComment.setImageResource(R.drawable.baseline_favorite_border_24); // Use your outlined heart drawable
                likeComment.clearColorFilter(); // Optional: Clear tint color
            }
        }

        public void deleteComment(Comment comment, Context context, List<Comment> commentList) {
            ServiceGenerator.createCommentService(context).delete(comment.getId()).enqueue(new Callback<SimpleAPIRespone>() {
                @Override
                public void onResponse(Call<SimpleAPIRespone> call, Response<SimpleAPIRespone> response) {
                    if (response.isSuccessful() && response.body() != null) {
                        // Remove the comment from the list
                        commentList.remove(comment);
                        notifyDataSetChanged();
                        // Show success message
                        Toast.makeText(context, "Comment deleted successfully", Toast.LENGTH_SHORT).show();
                    } else {
                        // Handle unsuccessful response
                        Toast.makeText(context, "Failed to delete comment", Toast.LENGTH_SHORT).show();
                    }
                }

                @Override
                public void onFailure(Call<SimpleAPIRespone> call, Throwable t) {
                    // Handle failure
                    Toast.makeText(context, "Error deleting comment: " + t.getMessage(), Toast.LENGTH_LONG).show();
                }
            });
        }

        private void updateComment(Comment comment, String newContent, Context context) {
            ServiceGenerator.createCommentService(context)
                    .edit(comment.getId(), new CommentReq(newContent))
                    .enqueue(new Callback<SimpleAPIRespone>() {
                        @Override
                        public void onResponse(Call<SimpleAPIRespone> call, Response<SimpleAPIRespone> response) {
                            if (response.isSuccessful()) {
                                // Optionally handle success response
                                Toast.makeText(context, "Comment updated successfully", Toast.LENGTH_SHORT).show();
                            } else {
                                // Handle unsuccessful response
                                Toast.makeText(context, "Failed to update comment", Toast.LENGTH_SHORT).show();
                            }
                        }

                        @Override
                        public void onFailure(Call<SimpleAPIRespone> call, Throwable t) {
                            Toast.makeText(context, "Error updating comment: " + t.getMessage(), Toast.LENGTH_SHORT).show();
                        }
                    });
        }


        // Method to like a comment
        private void likeComment(Comment comment, Context context) {
            ServiceGenerator.createCommentService(context).likesComment(comment.getId()).enqueue(new Callback<SimpleAPIRespone>() {
                @Override
                public void onResponse(Call<SimpleAPIRespone> call, Response<SimpleAPIRespone> response) {
                    if (response.body() != null) {
                        SimpleAPIRespone apiResponse = response.body();
                        Log.i("likePost", "Like successful " + comment.getIsLiked());
                        comment.setLikes(comment.getLikes() + 1);
                        amountCommentLike.setText(String.valueOf(comment.getLikes()));
                    } else {
                        try {
                            SimpleAPIRespone errResponse = HttpUtil.parseError(response, SimpleAPIRespone.class, context);
                            Toast.makeText(context, "Error: " + errResponse.getMes(), Toast.LENGTH_SHORT).show();
                        } catch (Exception e) {
                            e.printStackTrace();
                        }
                    }
                }

                @Override
                public void onFailure(Call<SimpleAPIRespone> call, Throwable t) {
                    Toast.makeText(context, "Error liking comment", Toast.LENGTH_SHORT).show();
                    Log.i("likePost", "API call failed");
                }
            });
        }

        // Method to unlike a comment
        private void unlikeComment(Comment comment, Context context) {
            ServiceGenerator.createCommentService(context).unlikeComment(comment.getId()).enqueue(new Callback<SimpleAPIRespone>() {
                @Override
                public void onResponse(Call<SimpleAPIRespone> call, Response<SimpleAPIRespone> response) {
                    if (response.isSuccessful()) {
                        SimpleAPIRespone apiResponse = response.body();
                        Log.i("unlikePost", "unLike successful " + comment.getIsLiked());

                        comment.setLikes(comment.getLikes() - 1);
                        amountCommentLike.setText(String.valueOf(comment.getLikes()));
                    } else {
                        try {
                            SimpleAPIRespone errResponse = HttpUtil.parseError(response, SimpleAPIRespone.class, context);
                            Toast.makeText(context, "Error: " + errResponse.getMes(), Toast.LENGTH_SHORT).show();
                        } catch (Exception e) {
                            e.printStackTrace();
                        }
                    }
                }

                @Override
                public void onFailure(Call<SimpleAPIRespone> call, Throwable t) {
                    Toast.makeText(context, "Error unliking comment", Toast.LENGTH_SHORT).show();
                    Log.i("unlikePost", "API call failed");
                }
            });
        }
    }


}
