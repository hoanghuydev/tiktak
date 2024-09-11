package com.example.tiktokapp.activity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.EditText;
import android.widget.ImageButton;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;

import com.example.tiktokapp.R;
import com.example.tiktokapp.requestModel.SignUpReq;
import com.example.tiktokapp.requestModel.SignUpRes;
import com.example.tiktokapp.responseModel.APIRespone;
import com.example.tiktokapp.responseModel.SimpleAPIRespone;
import com.example.tiktokapp.responseModel.User;
import com.example.tiktokapp.services.AuthService;
import com.example.tiktokapp.services.ServiceGenerator;
import com.example.tiktokapp.utils.HttpUtil;
import com.example.tiktokapp.utils.IntentUtil;
import com.google.android.material.button.MaterialButton;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class SignUpActivity extends AppCompatActivity {
    EditText username, password, email, retypePassword, fullname;
    MaterialButton btnSignUp;
    TextView loginPage;
    ImageButton closeBtn;
    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.fragment_sign_up);
        username = findViewById(R.id.username);
        password = findViewById(R.id.password);
        retypePassword = findViewById(R.id.retype_password);
        email = findViewById(R.id.email);
        fullname = findViewById(R.id.fullname);
        btnSignUp = findViewById(R.id.sign_up);

        btnSignUp.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                SignUpReq signUpReq = new SignUpReq();
                signUpReq.setUserName(username.getText().toString());
                signUpReq.setPassword(password.getText().toString());
                signUpReq.setEmail(email.getText().toString());
                signUpReq.setFullName(fullname.getText().toString());
                Call<APIRespone<User>> res = ServiceGenerator.createAuthService(v.getContext()).register(signUpReq);
                res.enqueue(new Callback<APIRespone<User>>() {
                    @Override
                    public void onResponse(Call<APIRespone<User>> call, Response<APIRespone<User>> response) {
                        if(response.isSuccessful()){
                            Toast.makeText(SignUpActivity.this, "Registered successfully, Your otp has been sent to email address. OTP will be expired in 5 minutes", Toast.LENGTH_LONG);
                            startActivity(new Intent(SignUpActivity.this, VerifyEmailActivity.class));
                        } else {
                            try {
                                SimpleAPIRespone errResponse = HttpUtil.parseError(response, SimpleAPIRespone.class,v.getContext());
                                Toast.makeText(SignUpActivity.this, "Error: " + errResponse.getMes(), Toast.LENGTH_SHORT).show();
                            } catch (Exception e) {
                                e.printStackTrace();
                            }
                        }
                    }

                    @Override
                    public void onFailure(Call<APIRespone<User>> call, Throwable t) {
                        Toast.makeText(v.getContext(), "Error: " + t.getMessage(), Toast.LENGTH_SHORT).show();
                    }
                });
            }
        });
        loginPage = findViewById(R.id.use_sign_up_btn);
        loginPage.setOnClickListener(v -> IntentUtil.changeActivity(this, LoginActivity.class));
        closeBtn = findViewById(R.id.sign_up_cancel_btn);
        closeBtn.setOnClickListener(v -> finish());
    }
}
