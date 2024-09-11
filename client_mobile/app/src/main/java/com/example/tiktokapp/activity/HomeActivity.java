package com.example.tiktokapp.activity;

import android.Manifest;
import android.content.Context;
import android.content.SharedPreferences;
import android.content.pm.PackageManager;
import android.os.Bundle;
import android.util.Log;
import android.widget.ImageView;
import android.widget.Toast;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;
import androidx.viewpager2.widget.ViewPager2;

import com.example.tiktokapp.R;
import com.example.tiktokapp.responseModel.SimpleAPIRespone;
import com.example.tiktokapp.services.ServiceGenerator;
import com.example.tiktokapp.utils.HttpUtil;
import com.example.tiktokapp.adapter.PostAdapter;
import com.example.tiktokapp.fragment.CommentBottomSheetFragment;
import com.example.tiktokapp.responseModel.APIResponeList;
import com.example.tiktokapp.responseModel.Post;
import com.example.tiktokapp.services.PostService;
import com.example.tiktokapp.utils.IntentUtil;

import java.util.ArrayList;
import java.util.List;

import retrofit2.Call;
import retrofit2.Response;

public class HomeActivity extends BaseActivity  {

    private ImageView uploadButton;
    private List<Post> postList;
    private ViewPager2 viewPager2;
    private PostAdapter adapter;
    private String username, fullname;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_home);
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main), (v, insets) -> {
            Insets systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars());
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom);
            return insets;
        });
        viewPager2 = findViewById(R.id.viewPager2);
        // Initialize adapter with an empty list initially
        postList = new ArrayList<>();
        adapter = new PostAdapter(postList, this);
        viewPager2.setAdapter(adapter);
        initNavbar(this);
        // Call API to get posts
        getPosts(this);

    }

    @Override
    protected void onStart() {
        super.onStart();

        loadPreferences();
    }

    private void loadPreferences() {
        SharedPreferences preferences = getSharedPreferences("MyPreferences", MODE_PRIVATE);
        username = preferences.getString("username", "");
        fullname = preferences.getString("fullName", "");

    }

    public void getPosts(Context context) {
        ServiceGenerator.createPostService(HomeActivity.this).getPosts().enqueue(new retrofit2.Callback<APIResponeList<Post>>() {
            @Override
            public void onResponse(Call<APIResponeList<Post>> call, Response<APIResponeList<Post>> response) {
                APIResponeList<Post> apiResponse = response.body();
                if (response.isSuccessful()) {
                    apiResponse = response.body();
                    postList = apiResponse.getData();
                    adapter.setData(postList);
                    adapter.notifyDataSetChanged();
//                    adapter.setOnItemClickListener(postId -> {
//                        CommentBottomSheetFragment bottomSheet = new CommentBottomSheetFragment(postId);
//                        bottomSheet.show(getSupportFragmentManager(), "ModalBottomSheet");
//                    });
                } else {
                    Toast.makeText(HomeActivity.this, apiResponse.getMes(), Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onFailure(Call<APIResponeList<Post>> call, Throwable t) {
                Toast.makeText(HomeActivity.this, t.getMessage(), Toast.LENGTH_SHORT).show();
            }
        });
    }
}
