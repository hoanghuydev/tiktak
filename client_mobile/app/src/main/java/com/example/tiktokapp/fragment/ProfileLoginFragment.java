package com.example.tiktokapp.fragment;

import android.os.Bundle;

import androidx.fragment.app.Fragment;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.example.tiktokapp.R;
import com.example.tiktokapp.activity.LoginActivity;
import com.example.tiktokapp.utils.IntentUtil;
import com.google.android.material.button.MaterialButton;

public class ProfileLoginFragment extends Fragment {
    private MaterialButton openLoginButton;


    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_profile_login, container, false);
        openLoginButton = view.findViewById(R.id.btnOpenLogin);
        openLoginButton.setOnClickListener(v -> IntentUtil.changeActivity(view.getContext(), LoginActivity.class));
        return view;
    }
}