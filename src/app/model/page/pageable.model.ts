import { Sort } from './sort.model';

export class Pageable {
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    sort: Sort;
    unpaged: boolean;
    size: number;
    page: number;

    constructor(props = {}) {
        Object.assign(this, props);
    }
}
