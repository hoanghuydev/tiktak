package com.example.tiktokapp;

import android.Manifest;

import java.io.File;
import java.util.ArrayList;

public class Constant {

    public static final String[] videoExtensions = {".mp4",".mov"};
    public static final String[] imageExtensions = {".jpg",".jpeg",".png",".webm"};
    public static ArrayList<File> allVideoFiles = new ArrayList<>();
    public static ArrayList<File> allImageFiles = new ArrayList<>();
    public static String videoPathUpload = "";
    public static String[] storage_permissions  = {Manifest.permission.READ_EXTERNAL_STORAGE};
    public static String[] storage_permissions_33  = {
            Manifest.permission.READ_MEDIA_IMAGES,
            Manifest.permission.READ_MEDIA_AUDIO,
            Manifest.permission.READ_MEDIA_VIDEO
    };
    public static final int STATE_GET_FOLLOWERS  = 1;
    public static final int STATE_GET_FOLLOWINGS  = 0;
    public static final int REQUEST_CODE_PERMISSIONS_UPLOAD  = 1;
    public static final int REQUEST_CODE_GET_VIDEO_LIST = 804;
    public static final int REQUEST_CODE_GET_IMAGE_LIST = 805;
    public static final int REQUEST_GET_IMAGE_EDIT_AVATAR = 1312;
    public static final int REQUEST_POST_LIST_FOR_PROFILE = 1313;
    public static final int RESPONSE_CODE_GET_VIDEO_LIST = 804;
    public static final int RESPONSE_CODE_GET_IMAGE_LIST = 805;
    public static final int VISIBILITY_POST_PUBLIC = 1;
    public static final int VISIBILITY_POST_FRIEND = 0;
    public static final int VISIBILITY_POST_PRIVATE = -1;
}
