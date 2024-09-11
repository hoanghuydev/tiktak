package com.example.tiktokapp.activity;

import android.annotation.SuppressLint;
import android.content.Context;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.ImageButton;
import android.widget.TextView;
import android.widget.Toast;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentManager;
import androidx.fragment.app.FragmentTransaction;

import com.example.tiktokapp.Constant;
import com.example.tiktokapp.R;
import com.example.tiktokapp.adapter.FollowAdapter;
import com.example.tiktokapp.fragment.FollowFragment;
import com.example.tiktokapp.responseModel.APIResponeList;
import com.example.tiktokapp.responseModel.Follow;
import com.example.tiktokapp.services.ServiceGenerator;
import com.example.tiktokapp.utils.AuthUtil;

import java.util.ArrayList;
import java.util.List;

import retrofit2.Call;
import retrofit2.Response;

public class ViewFollowActivity extends AppCompatActivity {
    private Button btnShowFollow, btnShowFollowee ;
    private ImageButton backBtn;
    private int state;
    private int userId;
    private TextView userName;
    private TextView f_userName;
    @SuppressLint("MissingInflatedId")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_view_follow);
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main), (v, insets) -> {
            Insets systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars());
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom);
            return insets;
        });

//        userId = AuthUtil.getUserId(this);
//        userName = findViewById(R.id.f_userName);
//        userName.setText(AuthUtil.getCurrentUser(this).getUserName());
        userId = getIntent().getIntExtra("userId", -1);
//      This state using to check if we want to show followers or followings
        state = getIntent().getIntExtra("state", -1);
        f_userName = findViewById(R.id.f_userName);
        if (state== Constant.STATE_GET_FOLLOWINGS) {
            f_userName.setText("Đang theo dõi");
        } else if (state== Constant.STATE_GET_FOLLOWERS) {
            f_userName.setText("Người theo dõi");
        }
        displayFragment(new FollowFragment());

        backBtn = findViewById(R.id.backBtnFollow);
        backBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                finish();
            }
        });
    }

    private void displayFragment(Fragment fragment) {
        FragmentManager fragmentManager = getSupportFragmentManager();
        FragmentTransaction fragmentTransaction = fragmentManager.beginTransaction();
        //set userId
        Bundle bundle = new Bundle();
        bundle.putInt("userId",userId);
        bundle.putInt("state", state);
        fragment.setArguments(bundle);
        fragmentTransaction.replace(R.id.fragment_container, fragment);
        fragmentTransaction.commit();
    }

}