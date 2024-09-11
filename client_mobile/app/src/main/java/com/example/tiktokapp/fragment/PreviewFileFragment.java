package com.example.tiktokapp.fragment;

import android.content.Context;
import android.os.Bundle;

import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.GridLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Toast;

import com.example.tiktokapp.Constant;
import com.example.tiktokapp.R;
import com.example.tiktokapp.adapter.FilePreviewAdapter;
import com.example.tiktokapp.responseModel.APIResponeList;
import com.example.tiktokapp.responseModel.Post;
import com.example.tiktokapp.responseModel.SimpleAPIRespone;
import com.example.tiktokapp.services.ServiceGenerator;
import com.example.tiktokapp.utils.AuthUtil;
import com.example.tiktokapp.utils.HttpUtil;

import java.util.ArrayList;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class PreviewFileFragment extends Fragment {
    private RecyclerView recyclerView;
    private FilePreviewAdapter videoAdapter;
    private int requestCode;
    private int userId;
    private List<Object> files;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        if (getArguments() != null) {
            requestCode = getArguments().getInt("requestCode", -1);
            userId = getArguments().getInt("userId", AuthUtil.getUserId(getContext()));
        }
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_video_files, container, false);
        recyclerView = view.findViewById(R.id.recyclerView);
        recyclerView.setLayoutManager(new GridLayoutManager(getContext(), 3));
        files = new ArrayList<>();

        loadFilesBasedOnRequestCode();

        videoAdapter = new FilePreviewAdapter(getContext(), files, requestCode);
        recyclerView.setAdapter(videoAdapter);
        return view;
    }

    private void loadFilesBasedOnRequestCode() {
        if (requestCode == Constant.REQUEST_CODE_GET_VIDEO_LIST) {
            files.addAll(Constant.allVideoFiles);
        } else if (requestCode == Constant.REQUEST_CODE_GET_IMAGE_LIST || requestCode == Constant.REQUEST_GET_IMAGE_EDIT_AVATAR) {
            files.addAll(Constant.allImageFiles);
        } else if (requestCode == Constant.REQUEST_POST_LIST_FOR_PROFILE) {
            getPostsByUserId(getContext());
        }
    }

    public void getPostsByUserId(Context context) {
        ServiceGenerator.createPostService(context).getPostsByUserId(userId).enqueue(new Callback<APIResponeList<Post>>() {
            @Override
            public void onResponse(Call<APIResponeList<Post>> call, Response<APIResponeList<Post>> response) {
                if (response.isSuccessful()) {
                    APIResponeList<Post> apiResponse = response.body();
                    List<Post> posts = apiResponse.getData();
                    files.addAll(posts);
                    videoAdapter.notifyDataSetChanged();
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
            public void onFailure(Call<APIResponeList<Post>> call, Throwable t) {
                Toast.makeText(context, t.getMessage(), Toast.LENGTH_SHORT).show();
            }
        });
    }

}
