package com.example.tiktokapp.responseModel;
import java.sql.Timestamp;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@AllArgsConstructor
@RequiredArgsConstructor
public class Role extends AbstractModel{
    private String code;
    private String value;

}
