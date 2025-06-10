import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { TableState, FilterState, DataRow } from '../types';

const initialState: TableState = {
  data: [],
  filteredData: [],
  filters: {},
  currentPage: 1,
  rowsPerPage: 100,
  totalRows: 0,
};

const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<DataRow[]>) => {
      state.data = action.payload;
      state.filteredData = action.payload;
      state.totalRows = action.payload.length;
    },
    setFilters: (state, action: PayloadAction<FilterState>) => {
      state.filters = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setFilteredData: (state, action: PayloadAction<DataRow[]>) => {
      state.filteredData = action.payload;
      state.totalRows = action.payload.length;
    },
  },
});

export const { setData, setFilters, setCurrentPage, setFilteredData } = tableSlice.actions;
export default tableSlice.reducer; 