package com.example.tiktokapp.responseModel;

import java.sql.Timestamp;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@AllArgsConstructor
@RequiredArgsConstructor
abstract class AbstractModel {
     private int id;
     private Timestamp createdAt;
     private Timestamp updatedAt;

}
