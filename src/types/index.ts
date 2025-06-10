export interface DataRow {
  [key: string]: number;
}

export interface FilterState {
  [columnName: string]: number[];
}

export interface TableState {
  data: DataRow[];
  filteredData: DataRow[];
  filters: FilterState;
  currentPage: number;
  rowsPerPage: number;
  totalRows: number;
}

export interface FilterOption {
  id: number;
  text: string;
}

export interface Column {
  name: string;
  selector: (row: DataRow) => number;
  sortable: boolean;
} 