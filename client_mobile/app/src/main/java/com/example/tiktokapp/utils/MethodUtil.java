package com.example.tiktokapp.utils;

import com.example.tiktokapp.Constant;

import java.io.File;

public class MethodUtil {
    public static void load_files(File directory, int typeFile) {
        File[] files = directory.listFiles();
        if (files != null && files.length > 0) {
            for (File file : files) {
                if (file.isDirectory()) {
                    load_files(file, typeFile);
                } else {
                    String fileName = file.getName().toLowerCase();
                    if (typeFile == 0) {
                        // Load both video and image files
                        if (isVideoFile(fileName)) {
                            Constant.allVideoFiles.add(file);
                        }
                        if (isImageFile(fileName)) {
                            Constant.allImageFiles.add(file);
                        }
                    } else if (typeFile == 1 && isVideoFile(fileName)) {
                        Constant.allVideoFiles.add(file);
                    } else if (typeFile == 2 && isImageFile(fileName)) {
                        Constant.allImageFiles.add(file);
                    }
                }
            }
        }
    }

    private static boolean isVideoFile(String fileName) {
        for (String extension : Constant.videoExtensions) {
            if (fileName.endsWith(extension)) {
                return true;
            }
        }
        return false;
    }

    private static boolean isImageFile(String fileName) {
        for (String extension : Constant.imageExtensions) {
            if (fileName.endsWith(extension)) {
                return true;
            }
        }
        return false;
    }
}
