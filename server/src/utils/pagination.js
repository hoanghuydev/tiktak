export const pagingConfig = (
    page = 1,
    pageSize = process.env.LIMIT_ITEM,
    orderBy = 'createdAt',
    orderDirection = 'DESC'
) => {
    const pageNumber = Math.max(1, +page);
    const limit = Math.max(1, +pageSize) || 10;
    const offset = (pageNumber - 1) * limit;
    const paginationQuery = {
        raw: true,
        nest: true,
        orderBy,
        orderDirection,
        page: pageNumber,
        offset,
        limit,
        order: [[orderBy, orderDirection]],
    };

    return paginationQuery;
};
export const paginationResponse = (paginationQuery, pageSize, page, count) => {
    const totalItems = count;
    const totalPages =
        totalItems / pageSize >= 1 ? Math.ceil(totalItems / pageSize) : 1;
    const hasNextPage = page < totalPages;
    const hasPreviousPage = page > 1;
    return {
        pagination: {
            page: paginationQuery.page,
            pageSize: paginationQuery.limit,
            orderDirection: paginationQuery.orderDirection,
            totalItems,
            totalPages,
            hasNextPage,
            hasPreviousPage,
        },
    };
};
