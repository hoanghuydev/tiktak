package com.example.tiktokapp.activity;

import android.annotation.SuppressLint;
import android.content.Context;
import android.os.Bundle;
import android.view.View;
import android.widget.ImageButton;
import android.widget.Toast;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;
import androidx.viewpager2.widget.ViewPager2;

import com.example.tiktokapp.R;
import com.example.tiktokapp.adapter.PostAdapter;
import com.example.tiktokapp.responseModel.APIRespone;
import com.example.tiktokapp.responseModel.Post;
import com.example.tiktokapp.responseModel.SimpleAPIRespone;
import com.example.tiktokapp.services.ServiceGenerator;
import com.example.tiktokapp.utils.HttpUtil;

import java.util.ArrayList;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class SubVideoActivity extends AppCompatActivity {

    private List<Post> postList;
    private ViewPager2 viewPager2;
    private PostAdapter adapter;

    private ImageButton backBtn;
    public int postId;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_sub_video);
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main), (v, insets) -> {
            Insets systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars());
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom);
            return insets;
        });

        viewPager2 = findViewById(R.id.viewPager2);
        postList = new ArrayList<>();
        backBtn = findViewById(R.id.backBtn);
        backBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                finish();
            }
        });
        adapter = new PostAdapter(postList,this);
        viewPager2.setAdapter(adapter);

        //call api
        postId = getIntent().getIntExtra("postId", -1);
        getPostById(postId, this);

    }

    public void getPostById(int postId, Context context) {
        ServiceGenerator.createPostService(context).getPostById(postId).enqueue(new retrofit2.Callback<APIRespone<Post>>() {
            @SuppressLint("NotifyDataSetChanged")
            @Override
            public void onResponse(Call<APIRespone<Post>> call, Response<APIRespone<Post>> response) {
                if (response.isSuccessful()) {
                    APIRespone<Post> apiResponse = response.body();
                    Post post = apiResponse.getData();
                    postList.clear(); // Clear existing data
                    postList.add(post); // Add new post
                    adapter.setData(postList); // Update adapter data
                    adapter.notifyDataSetChanged(); // Notify adapter
                    Toast.makeText(context, "Update Success: ", Toast.LENGTH_SHORT).show();
                    adapter.notifyDataSetChanged();
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
            public void onFailure(Call<APIRespone<Post>> call, Throwable t) {
                Toast.makeText(context, t.getMessage(), Toast.LENGTH_SHORT).show();
            }
        });
    }
}