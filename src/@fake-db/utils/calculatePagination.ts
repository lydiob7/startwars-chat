interface CalculatePaginationProps {
    totals: number;
    page: number;
    size: number;
}

export interface Pagination {
    firstPage: number;
    nextPage: number;
    previousPage: number;
    lastPage: number;
    currentPage: number;
    pageSize: number;
}

export default function calculatePagination({ totals, page, size }: CalculatePaginationProps): Pagination {
    const lastPage = totals < size ? 1 : Math.ceil(totals / size);
    const nextPage = page === lastPage ? 0 : page + 1;
    const previousPage = page === 1 ? 0 : page - 1;
    return {
        firstPage: totals > 0 ? 1 : 0,
        nextPage,
        previousPage,
        lastPage,
        currentPage: page,
        pageSize: size
    };
}
