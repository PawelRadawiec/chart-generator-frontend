import { Pageable } from './pageable.model';
import { Sort } from './sort.model';

export class Page {
    content: any[];
    empty: boolean;
    first: boolean;
    last: boolean;
    number: number;
    numberOfElements: number;
    pageable: Pageable;
    size: number;
    sort: Sort;
    totalElements: number;
    totalPages: number;

    constructor(props = {}) {
        Object.assign(this, props);
    }
}
