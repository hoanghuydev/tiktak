package com.example.tiktokapp.activity;

import android.os.Bundle;
import android.widget.ImageView;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;
import androidx.fragment.app.FragmentManager;
import androidx.fragment.app.FragmentTransaction;

import com.example.tiktokapp.Constant;
import com.example.tiktokapp.R;
import com.example.tiktokapp.adapter.FragmentViewPaggerAdapter;
import com.example.tiktokapp.fragment.PreviewFileFragment;
import com.example.tiktokapp.utils.MethodUtil;
import com.example.tiktokapp.utils.StorageUtil;

import java.io.File;
import java.util.ArrayList;

public class ChooseFileActivity extends AppCompatActivity {
    private ImageView btnClose;
    private FragmentViewPaggerAdapter uploadtabAdapter;
    private File storage;
    private String[] allPaths;
    private int requestCode;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_choose_file);
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main), (v, insets) -> {
            Insets systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars());
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom);
            return insets;
        });
        requestCode = getIntent().getIntExtra("requestCode", -1);
        loadFile();
        init();
        addVideoFilesFragment();
        handleAction();
    }
    private void init() {
        btnClose = findViewById(R.id.btnClose);
        btnClose.setOnClickListener(v -> {
            onBackPressed();
        });
    }
    private void handleAction() {

    }
    private void loadFile() {
        Constant.allVideoFiles = new ArrayList<File>();
        Constant.allImageFiles = new ArrayList<File>();
        allPaths = StorageUtil.getStorageDirectories(this);
        for (String path : allPaths) {
            storage = new File(path);
            MethodUtil.load_files(storage,0);
        }
    }
    private void addVideoFilesFragment() {
        PreviewFileFragment previewFileFragment = new PreviewFileFragment();
        Bundle bundle = new Bundle();
        bundle.putInt("requestCode", requestCode);
        previewFileFragment.setArguments(bundle);
        FragmentManager fragmentManager = getSupportFragmentManager();
        FragmentTransaction fragmentTransaction = fragmentManager.beginTransaction();
        fragmentTransaction.replace(R.id.layout_list_view, previewFileFragment);
        fragmentTransaction.commit();
    }
    @Override
    public void onBackPressed() {
        super.onBackPressed();
        overridePendingTransition(R.anim.slide_down_reverse, R.anim.slide_up_reverse);
        finish();
    }
}