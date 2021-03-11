import { filterOp } from './filterOp';

export interface queryDto {
    sortProp: filterOp;
    sortDir: string;
    searchProp: filterOp;
    searchVal: string;
}


