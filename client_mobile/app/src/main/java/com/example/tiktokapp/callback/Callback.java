package com.example.tiktokapp.callback;

import android.content.Context;
import android.widget.Toast;

public class Callback {

    public void onSuccess(Context context) {

    }

    public void onFailure(Context context, String errorMessage) {
        Toast.makeText(context, "Error: " + errorMessage, Toast.LENGTH_SHORT).show();
    }
}
