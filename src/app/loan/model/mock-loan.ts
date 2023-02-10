import { LoanPage } from './LoanPage';
import { LOAN_DATA_LIST } from './mock-loans-list';

export const LOAN_DATA: LoanPage = {
  content: LOAN_DATA_LIST,
  pageable: {
    pageSize: 5,
    pageNumber: 0,
    sort: [{ property: 'id', direction: 'ASC' }],
  },
  totalElements: LOAN_DATA_LIST.length,
};
