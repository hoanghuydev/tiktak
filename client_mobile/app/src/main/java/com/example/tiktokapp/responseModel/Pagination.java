package com.example.tiktokapp.responseModel;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Pagination {
    private String orderBy;
    private int page;
    private int pageSize;
    private int totalPages;
    private int totalItems;
    private String orderDirection;
}
