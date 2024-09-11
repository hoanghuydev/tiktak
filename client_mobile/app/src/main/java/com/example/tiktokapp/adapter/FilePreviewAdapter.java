package com.example.tiktokapp.adapter;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.graphics.drawable.Drawable;
import android.media.MediaMetadataRetriever;
import android.net.Uri;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.constraintlayout.widget.ConstraintLayout;
import androidx.recyclerview.widget.RecyclerView;

import com.bumptech.glide.Glide;
import com.example.tiktokapp.Constant;
import com.example.tiktokapp.R;
import com.example.tiktokapp.activity.UploadAvatarActivity;
import com.example.tiktokapp.activity.SubVideoActivity;
import com.example.tiktokapp.activity.UploadPost;
import com.example.tiktokapp.responseModel.Post;
import com.example.tiktokapp.utils.IntentUtil;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.concurrent.TimeUnit;

public class FilePreviewAdapter extends RecyclerView.Adapter<FilePreviewAdapter.FileViewHolder> {
    private final List<Object> models;
    private final Context context;
    private int type;
    public FilePreviewAdapter(Context context, List<Object> models, int type) {
        this.context = context;
        this.models = models;
        this.type = type;
    }

    @NonNull
    @Override
    public FileViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(context).inflate(R.layout.fragment_item_file, parent, false);
        return new FileViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull FileViewHolder holder, int position) {
        Object item = models.get(position);
        switch (type) {
            case Constant.REQUEST_CODE_GET_VIDEO_LIST:
                try {
                    bindVideoFile(holder, (File) item);
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
                break;
            case Constant.REQUEST_CODE_GET_IMAGE_LIST:
                bindImageFile(holder, (File) item);
                break;
            case Constant.REQUEST_GET_IMAGE_EDIT_AVATAR:
                bindImageAvatar(holder, (File) item);
                break;
            case Constant.REQUEST_POST_LIST_FOR_PROFILE:
                bindPost(holder, (Post) item);
                break;
        }
    }

    private void bindVideoFile(@NonNull FileViewHolder holder, File videoFile) throws IOException {
        if (Constant.allVideoFiles.contains(videoFile)) {
            MediaMetadataRetriever retriever = new MediaMetadataRetriever();
            retriever.setDataSource(videoFile.getAbsolutePath());
            String time = retriever.extractMetadata(MediaMetadataRetriever.METADATA_KEY_DURATION);
            long timeInMillisec = Long.parseLong(time);
            String duration = String.format("%02d:%02d",
                    TimeUnit.MILLISECONDS.toMinutes(timeInMillisec),
                    TimeUnit.MILLISECONDS.toSeconds(timeInMillisec) -
                            TimeUnit.MINUTES.toSeconds(TimeUnit.MILLISECONDS.toMinutes(timeInMillisec))
            );
            holder.videoDuration.setText(duration);
            holder.videoDuration.setCompoundDrawablesWithIntrinsicBounds(0, 0, 0, 0);
            retriever.release();
        } else {
            holder.videoDuration.setText("");
        }
        Glide.with(context).load(videoFile).into(holder.videoThumbnail);
        holder.itemView.setOnClickListener(v -> {
            Constant.videoPathUpload = videoFile.getAbsolutePath();
            IntentUtil.changeActivityAndPutString(holder.itemView.getContext(), UploadPost.class, "video_path", videoFile.getAbsolutePath());
        });
    }

    private void bindImageFile(@NonNull FileViewHolder holder, File imageFile) {
        holder.videoDuration.setText("");
        holder.videoDuration.setCompoundDrawablesWithIntrinsicBounds(0, 0, 0, 0);
        Glide.with(context).load(imageFile).into(holder.videoThumbnail);
        holder.itemView.setOnClickListener(v -> {
            Intent intent = new Intent(context, UploadPost.class);
            intent.putExtra("video_path", Constant.videoPathUpload);
            intent.putExtra("image_path", imageFile.getAbsolutePath());
            context.startActivity(intent);
            if (context instanceof Activity) {
                ((Activity) context).finish(); // Finish the current activity
            }
        });
    }

    private void bindImageAvatar(@NonNull FileViewHolder holder, File imageFile) {
        holder.videoDuration.setText("");
        holder.videoDuration.setCompoundDrawablesWithIntrinsicBounds(0, 0, 0, 0);
        Glide.with(context).load(imageFile).into(holder.videoThumbnail);
        holder.itemView.setOnClickListener(v -> {
            Intent intent = new Intent(context, UploadAvatarActivity.class);
            intent.putExtra("image_path", imageFile.getAbsolutePath());
            context.startActivity(intent);
            if (context instanceof Activity) {
                ((Activity) context).finish(); // Finish the current activity
            }
        });
    }

    private void bindPost(@NonNull FileViewHolder holder, Post post) {
        ConstraintLayout.LayoutParams params = (ConstraintLayout.LayoutParams) holder.videoDuration.getLayoutParams();
        params.bottomToBottom = ConstraintLayout.LayoutParams.PARENT_ID;
        params.startToStart = ConstraintLayout.LayoutParams.PARENT_ID;
        params.endToEnd = ConstraintLayout.LayoutParams.UNSET;
        params.bottomMargin = 10; // Adjust as necessary
        params.leftMargin = 10; // Adjust as necessary
        holder.videoDuration.setLayoutParams(params);
        Drawable icon = context.getResources().getDrawable(R.drawable.play);
        int iconSize = (int) (16 * context.getResources().getDisplayMetrics().density);
        icon.setBounds(0, 0, iconSize, iconSize);
        holder.videoDuration.setCompoundDrawables(icon, null, null, null);
        holder.videoDuration.setText(" "+post.getViews());
        Uri thumbnailUri = Uri.parse(post.getThumnailUrl().toString());
        Glide.with(holder.itemView.getContext()).load(thumbnailUri).into(holder.videoThumbnail);
        // Set height of videoThumbnail to 200dp
        int heightInDp = 200;  // desired height in dp
        int heightInPx = (int) (heightInDp * context.getResources().getDisplayMetrics().density); // convert dp to px
        ViewGroup.LayoutParams layoutParams = holder.videoThumbnail.getLayoutParams();
        layoutParams.height = heightInPx;  // set height in px
        holder.videoThumbnail.setLayoutParams(layoutParams);
        holder.itemView.setOnClickListener(v -> {
            Bundle bundle = new Bundle();
            bundle.putInt("postId", post.getId());
            IntentUtil.changeActivityWithData(holder.itemView.getContext(), SubVideoActivity.class,bundle);
        });
    }
    @Override
    public int getItemCount() {
        return models.size();
    }

    static class FileViewHolder extends RecyclerView.ViewHolder {
        ImageView videoThumbnail;
        TextView videoDuration;
        public FileViewHolder(@NonNull View itemView) {
            super(itemView);
            videoThumbnail = itemView.findViewById(R.id.videoThumbnail);
            videoDuration = itemView.findViewById(R.id.videoDuration);
        }
    }
}
