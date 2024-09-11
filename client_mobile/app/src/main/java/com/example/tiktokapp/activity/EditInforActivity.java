package com.example.tiktokapp.activity;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.util.Log;
import android.widget.EditText;
import android.widget.ImageButton;
import android.widget.TextView;
import android.widget.Toast;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

import com.example.tiktokapp.R;
import com.example.tiktokapp.requestModel.UpdateUserInforReq;
import com.example.tiktokapp.responseModel.APIRespone;
import com.example.tiktokapp.responseModel.SimpleAPIRespone;
import com.example.tiktokapp.responseModel.User;
import com.example.tiktokapp.services.ServiceGenerator;
import com.example.tiktokapp.utils.IntentUtil;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class EditInforActivity extends AppCompatActivity {

    private TextView cancel, save, txtTitle, subline;
    private EditText editText;
    private ImageButton deleteContent;
    private SharedPreferences preferences;
    private SharedPreferences.Editor editor;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_edit_infor);
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main), (v, insets) -> {
            Insets systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars());
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom);
            return insets;
        });

        preferences = getSharedPreferences("MyPreferences", MODE_PRIVATE);
        editor = preferences.edit();
        Intent i = getIntent();
        String titleName = i.getStringExtra("title");
        boolean method = i.getBooleanExtra("method", false);

        cancel = findViewById(R.id.cancelEdit);
        save = findViewById(R.id.saveEdit);
        editText = findViewById(R.id.editText);
        txtTitle = findViewById(R.id.contentEdit);
        deleteContent = findViewById(R.id.deleteContent);
        subline = findViewById(R.id.textView5);

        String username = i.getStringExtra("username");
        String fullname = i.getStringExtra("fullname");
        String sublines = i.getStringExtra("subline");
        String edtValue = method ? fullname : username;
        int userID = i.getIntExtra("id", -1);

        subline.setText(sublines);
        txtTitle.setText(titleName);
        cancel.setOnClickListener(v -> {
            finish();
        });
        editText.setText(edtValue);

        deleteContent.setOnClickListener(v -> {
            editText.setText("");
        });

        save.setOnClickListener(v -> {
            // Save the EditText content
            String text = editText.getText().toString();
            UpdateUserInforReq infor;
            if (method) {
                infor = new UpdateUserInforReq(username, text);
            } else {
                infor = new UpdateUserInforReq(text, fullname);
            }
            if (!text.isEmpty()) {
                updateUser(userID, infor, this);
            } else {
                Toast.makeText(EditInforActivity.this, "Text is empty", Toast.LENGTH_SHORT).show();
            }
        });
    }

    private void updateUser(int id, UpdateUserInforReq inforReq, Context context) {
        ServiceGenerator.createUserService(context)
                .updateUser(id, inforReq)
                .enqueue(new Callback<APIRespone<User>>() {

                    @Override
                    public void onResponse(Call<APIRespone<User>> call, Response<APIRespone<User>> response) {
                        // Handle successful response
                        if (response.isSuccessful() && response.body() != null) {
                            APIRespone<User> apiResponse = response.body();
                            editor.putString("fullName", inforReq.getFullname());
                            editor.putString("username", inforReq.getUsername());
                            editor.apply();
                            Toast.makeText(EditInforActivity.this, "User updated successfully", Toast.LENGTH_SHORT).show();
                            IntentUtil.changeActivity(EditInforActivity.this,EditProfileActivity.class);
                            finish();
                        } else {
                            Toast.makeText(EditInforActivity.this, "User didn't got updated", Toast.LENGTH_SHORT).show();
                            Log.d("update user", "onResponse: " + response.message());
                        }
                    }

                    @Override
                    public void onFailure(Call<APIRespone<User>> call, Throwable t) {
                        Toast.makeText(EditInforActivity.this, "Error" + t.getMessage(), Toast.LENGTH_SHORT).show();
                    }
                });
    }


}