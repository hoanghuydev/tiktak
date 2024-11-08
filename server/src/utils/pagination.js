export const pagingConfig = (
    page = 1,
    pageSize = process.env.LIMIT_ITEM,
    orderBy = 'createdAt',
    orderDirection = 'DESC'
) => {
    const pageNumber = Math.max(1, +page);
    const limit = Math.max(1, +pageSize) || 10;
    const offset = (pageNumber - 1) * limit;
    const queries = {
        raw: true,
        nest: true,
        orderBy,
        orderDirection,
        page: pageNumber,
        offset,
        limit,
        order: [[orderBy, orderDirection]],
    };

    return queries;
};
