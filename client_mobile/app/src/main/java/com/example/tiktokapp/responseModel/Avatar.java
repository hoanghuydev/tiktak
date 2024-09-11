package com.example.tiktokapp.responseModel;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.sql.Timestamp;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Avatar extends AbstractModel{
    private String publicId;
    private String url;
    private String code;

}
