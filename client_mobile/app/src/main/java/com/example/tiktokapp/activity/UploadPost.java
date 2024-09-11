    package com.example.tiktokapp.activity;

    import android.app.Activity;
    import android.app.ProgressDialog;
    import android.content.Intent;
    import android.os.Bundle;
    import android.text.Editable;
    import android.text.TextWatcher;
    import android.view.View;
    import android.widget.AdapterView;
    import android.widget.ArrayAdapter;
    import android.widget.AutoCompleteTextView;
    import android.widget.EditText;
    import android.widget.ImageButton;
    import android.widget.ImageView;
    import android.widget.TextView;
    import android.widget.Toast;

    import androidx.activity.EdgeToEdge;
    import androidx.appcompat.app.AppCompatActivity;
    import androidx.core.graphics.Insets;
    import androidx.core.view.ViewCompat;
    import androidx.core.view.WindowInsetsCompat;

    import com.bumptech.glide.Glide;
    import com.example.tiktokapp.Constant;
    import com.example.tiktokapp.R;
    import com.example.tiktokapp.responseModel.APIRespone;
    import com.example.tiktokapp.responseModel.Post;
    import com.example.tiktokapp.responseModel.SimpleAPIRespone;
    import com.example.tiktokapp.services.PostService;
    import com.example.tiktokapp.services.ServiceGenerator;
    import com.example.tiktokapp.utils.HttpUtil;
    import com.example.tiktokapp.utils.IntentUtil;
    import com.google.android.material.button.MaterialButton;
    import com.google.android.material.textfield.TextInputLayout;

    import java.io.File;

    import okhttp3.MediaType;
    import okhttp3.MultipartBody;
    import okhttp3.RequestBody;
    import retrofit2.Call;
    import retrofit2.Callback;
    import retrofit2.Response;

    public class UploadPost extends AppCompatActivity {
        private ImageButton btnBack;
        private ImageView thumbnail;
        private File videoFile,imageFile;
        private EditText titlePost;
        private TextView editThumbnail;
        private MaterialButton btnUpload;
        private TextInputLayout visibilityIcon;
        private String[] visibilityList = {"Ai cũng có thể nhìn thấy bài viết này", "Chỉ bạn bè của bạn mới thấy bài viết này", "Chỉ mình tôi"};
        private int visibility=1;
        private ProgressDialog mProgressDialog;
        private AutoCompleteTextView autoCompleteTextView;
        private ArrayAdapter<String> adapterItems;

        @Override
        protected void onCreate(Bundle savedInstanceState) {
            super.onCreate(savedInstanceState);
            EdgeToEdge.enable(this);
            setContentView(R.layout.activity_upload_post);
            ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main), (v, insets) -> {
                Insets systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars());
                v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom);
                return insets;
            });
            init();
            loadVideoAndThumbnail();
        }
        private void init() {
            mProgressDialog = new ProgressDialog(this);
            mProgressDialog.setMessage("Uploading...");
            btnBack = findViewById(R.id.btnBack);
            btnBack.setOnClickListener(v -> {
                onBackPressed();
            });
            btnUpload = findViewById(R.id.btnUpload);
            btnUpload.setEnabled(false);
            btnUpload.setOnClickListener(v -> {
                mProgressDialog.show();
                String title = titlePost.getText().toString().trim();
                RequestBody titleBody = RequestBody.create(MediaType.parse("multipart/form-data"), title);
                RequestBody visibilityBody = RequestBody.create(MediaType.parse("multipart/form-data"), String.valueOf(visibility));
                PostService postService = ServiceGenerator.createPostService(getApplicationContext());
                // Check if imageFile (thumbnail) is available
                if (imageFile != null && imageFile.exists()) {
                    // Create multipart request for uploadPostWithThumbnail
                    RequestBody fileBody = RequestBody.create(MediaType.parse("video/mp4"), videoFile);
                    MultipartBody.Part videoPart = MultipartBody.Part.createFormData("video", videoFile.getName(), fileBody);
                    RequestBody thumbnailBody = RequestBody.create(MediaType.parse("image/*"), imageFile);
                    MultipartBody.Part thumbnailPart = MultipartBody.Part.createFormData("thumnail", imageFile.getName(), thumbnailBody);
                    postService.uploadPostWithThumbnail(titleBody, visibilityBody, videoPart, thumbnailPart).enqueue(new Callback<APIRespone<Post>>() {
                        @Override
                        public void onResponse(retrofit2.Call<APIRespone<Post>> call, retrofit2.Response<APIRespone<Post>> response) {
                            if (response.isSuccessful()) {
                                APIRespone<Post> apiResponse = response.body();
                                Toast.makeText(v.getContext(),apiResponse.getMes() , Toast.LENGTH_SHORT).show();
                                mProgressDialog.dismiss();
                                IntentUtil.changeActivity(v.getContext(), HomeActivity.class);
                                if (v.getContext() instanceof Activity) {
                                    ((Activity) v.getContext()).finish();
                                }
                            } else {
                                try {
                                    SimpleAPIRespone errResponse = HttpUtil.parseError(response, SimpleAPIRespone.class,v.getContext());
                                    Toast.makeText(v.getContext(), "Error: " + errResponse.getMes(), Toast.LENGTH_SHORT).show();
                                } catch (Exception e) {
                                    e.printStackTrace();
                                }
                                mProgressDialog.dismiss();
                            }

                        }
                        @Override
                        public void onFailure(retrofit2.Call<APIRespone<Post>> call, Throwable t) {
                            Toast.makeText(v.getContext(), t.getMessage(), Toast.LENGTH_SHORT).show();
                            mProgressDialog.dismiss();
                        }
                    });
                } else {
                    RequestBody fileBody = RequestBody.create(MediaType.parse("video/mp4"), videoFile);
                    MultipartBody.Part videoPart = MultipartBody.Part.createFormData("video", videoFile.getName(), fileBody);
                    postService.uploadPost(titleBody, visibilityBody, videoPart).enqueue(new Callback<APIRespone<Post>>() {
                        @Override
                        public void onResponse(Call<APIRespone<Post>> call, Response<APIRespone<Post>> response) {
                            if (response.isSuccessful()) {
                                APIRespone<Post> apiResponse = response.body();
                                Toast.makeText(v.getContext(),apiResponse.getMes() , Toast.LENGTH_SHORT).show();
                                IntentUtil.changeActivity(v.getContext(), HomeActivity.class);
                                if (v.getContext() instanceof Activity) {
                                    ((Activity) v.getContext()).finish();
                                }
                                mProgressDialog.dismiss();
                            } else {
                                try {
                                    SimpleAPIRespone errResponse = HttpUtil.parseError(response, SimpleAPIRespone.class,v.getContext());
                                    Toast.makeText(v.getContext(), "Error: " + errResponse.getMes(), Toast.LENGTH_SHORT).show();
                                } catch (Exception e) {
                                    e.printStackTrace();
                                }
                                mProgressDialog.dismiss();
                            }
                        }

                        @Override
                        public void onFailure(Call<APIRespone<Post>> call, Throwable t) {
                            Toast.makeText(v.getContext(), t.getMessage(), Toast.LENGTH_SHORT).show();
                            mProgressDialog.dismiss();
                        }
                    });

                }
            });

            titlePost = findViewById(R.id.titlePost);
            titlePost.addTextChangedListener(new TextWatcher() {
                @Override
                public void beforeTextChanged(CharSequence s, int start, int count, int after) {

                }

                @Override
                public void onTextChanged(CharSequence s, int start, int before, int count) {
                    String newText = s.toString();
                    if (newText!="" && newText!=null) {
                        btnUpload.setEnabled(true);
                    } else {
                        btnUpload.setEnabled(false);
                    }
                }

                @Override
                public void afterTextChanged(Editable s) {

                }
            });
            editThumbnail = findViewById(R.id.editThumbnail);
            editThumbnail.setOnClickListener(v -> {
                Bundle bundle = new Bundle();
                bundle.putInt("requestCode", Constant.REQUEST_CODE_GET_IMAGE_LIST);
                IntentUtil.changeActivityWithData(this, ChooseFileActivity.class,bundle);
                finish();
            });
            visibilityIcon = findViewById(R.id.visibility);
            thumbnail = findViewById(R.id.thumbnail);
            autoCompleteTextView  = findViewById(R.id.autoCompleteTextView);
            adapterItems = new ArrayAdapter<String>(this, R.layout.dropdown_item,visibilityList);
            autoCompleteTextView.setAdapter(adapterItems);
            autoCompleteTextView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
                @Override
                public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                    switch (position) {
                        case 0:
                            visibility = Constant.VISIBILITY_POST_PUBLIC;
                            visibilityIcon.setStartIconDrawable(R.drawable.earth);
                            break;
                        case 1:
                            visibility = Constant.VISIBILITY_POST_FRIEND;
                            visibilityIcon.setStartIconDrawable(R.drawable.user_switch);

                            break;
                        case 2:
                            visibility = Constant.VISIBILITY_POST_PRIVATE;
                            visibilityIcon.setStartIconDrawable(R.drawable.lock);

                            break;
                    }
                }
            });

        }
        private void loadVideoAndThumbnail() {
            Intent intent = getIntent();
            String videoPath = intent.getStringExtra("video_path");
            videoFile = new File(videoPath);
            Glide.with(this).load(videoFile).into(thumbnail);
            // Load image
            if (intent.hasExtra("image_path")) {
                String imagePath = intent.getStringExtra("image_path");
                imageFile = new File(imagePath);
                Glide.with(this).load(imageFile).into(thumbnail);
            }
        }
    }