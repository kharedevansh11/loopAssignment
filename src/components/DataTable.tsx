import React from 'react';
import DataTable from 'react-data-table-component';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';
import type { Column, DataRow } from '../types';

export const DataTableComponent: React.FC = () => {
  const { filteredData, currentPage, rowsPerPage } = useSelector((state: RootState) => state.table as {
    filteredData: DataRow[];
    currentPage: number;
    rowsPerPage: number;
  });

  const columns: Column[] = Object.keys(filteredData[0] || {}).map(key => ({
    name: key,
    selector: (row) => row[key],
    sortable: true,
  }));

  return (
    <div className="data-table-container">
      <DataTable
        columns={columns}
        data={filteredData}
        pagination
        paginationPerPage={rowsPerPage}
        paginationDefaultPage={currentPage}
        paginationRowsPerPageOptions={[20, 50, 100]}
        highlightOnHover
        pointerOnHover
        responsive
        striped
      />
    </div>
  );
}; 