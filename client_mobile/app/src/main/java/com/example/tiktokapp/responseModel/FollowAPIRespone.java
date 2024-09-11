package com.example.tiktokapp.responseModel;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FollowAPIRespone extends SimpleAPIRespone {
    private Follow follow;

}
