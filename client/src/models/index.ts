export interface AbstractModel {
  id: number;
  createdAt: Date | number | string;
  updatedAt: Date | number | string;
}
export interface PaginationModel {
  orderBy: string;
  page: number;
  pageSize: number;
  orderDirection: string;
  totalItems: number;
  totalPages: number;
}
