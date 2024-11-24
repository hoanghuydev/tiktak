export interface AbstractModel {
  id: number;
  createdAt: Date | number | string;
  updatedAt: Date | number | string;
}
export interface PaginationModel {
  page: number;
  pageSize: number;
  orderDirection: string;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}
