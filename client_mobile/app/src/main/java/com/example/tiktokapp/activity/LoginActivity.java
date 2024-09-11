package com.example.tiktokapp.activity;

import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.view.View;
import android.widget.EditText;
import android.widget.ImageButton;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;

import com.example.tiktokapp.responseModel.APIRespone;
import com.example.tiktokapp.responseModel.User;
import com.example.tiktokapp.R;
import com.example.tiktokapp.requestModel.LoginReq;

import com.example.tiktokapp.services.AuthService;
import com.example.tiktokapp.services.ServiceGenerator;
import com.example.tiktokapp.utils.IntentUtil;
import com.google.android.material.button.MaterialButton;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class LoginActivity extends AppCompatActivity {
    EditText password, email;
    MaterialButton btnLogin;
    SharedPreferences preferences;
    SharedPreferences.Editor editor;
    TextView signUpPage;
    ImageButton closeBtn;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.fragment_login);
        preferences = getSharedPreferences("MyPreferences", MODE_PRIVATE);
        editor = preferences.edit();
        if(preferences.contains("accessToken")){
            startActivity(new Intent(LoginActivity.this, HomeActivity.class));
        }
        password = findViewById(R.id.password);
        email = findViewById(R.id.email);
        btnLogin = findViewById(R.id.log_in_btn);
        btnLogin.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String emailInput = email.getText().toString().trim();
                String passwordInput = password.getText().toString().trim();

                if (emailInput.isEmpty() || passwordInput.isEmpty()) {
                    Toast.makeText(LoginActivity.this, "Email and Password are required", Toast.LENGTH_SHORT).show();
                    return;
                }
                LoginReq loginReq = new LoginReq();
                loginReq.setPassword(passwordInput);
                loginReq.setEmailOrUsername(emailInput);
                Call<APIRespone<User>> res = ServiceGenerator.createAuthService(LoginActivity.this).login(loginReq);
                res.enqueue(new Callback<APIRespone<User>>() {
                    @Override
                    public void onResponse(Call<APIRespone<User>> call, Response<APIRespone<User>> response) {
                        if(response.isSuccessful()){
                            editor.putString("accessToken", response.body().getAccessToken());
                            editor.putString("username", response.body().getData().getUserName());
                            editor.putString("fullName", response.body().getData().getFullName());
                            editor.putString("email", response.body().getData().getEmail());
                            editor.putString("avatar", response.body().getData().getAvatarData().getUrl().toString());
                            editor.putInt("userID", response.body().getData().getId());
                            editor.commit();
                            Toast.makeText(LoginActivity.this, "Login Successful!", Toast.LENGTH_LONG);
                            startActivity(new Intent(LoginActivity.this, HomeActivity.class));
                        }
                    }

                    @Override
                    public void onFailure(Call<APIRespone<User>> call, Throwable t) {
                        Toast.makeText(LoginActivity.this, "Login error! Please try again", Toast.LENGTH_LONG);
                    }
                });
            }
        });
        signUpPage = findViewById(R.id.use_sign_up_btn);
        signUpPage.setOnClickListener(v -> IntentUtil.changeActivity(this, SignUpActivity.class));
        closeBtn = findViewById(R.id.log_in_cancel_btn);
        closeBtn.setOnClickListener(v -> finish());

    }
}
