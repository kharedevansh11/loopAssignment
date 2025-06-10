import type { DataRow, FilterState } from '../types';

export const loadCSVData = async (filePath: string): Promise<DataRow[]> => {
  const response = await fetch(filePath);
  const text = await response.text();
  const rows = text.split('\n').slice(1); // Skip header row
  return rows.map(row => {
    const values = row.split(',');
    const dataRow: DataRow = {};
    values.forEach((value, index) => {
      dataRow[`mod${index + 1}`] = parseInt(value, 10);
    });
    return dataRow;
  });
};

export const getAvailableFilterOptions = (
  data: DataRow[],
  columnName: string,
  currentFilters: FilterState
): number[] => {
  // First apply all other filters
  let filteredData = data;
  Object.entries(currentFilters).forEach(([col, values]) => {
    if (col !== columnName && values.length > 0) {
      filteredData = filteredData.filter(row => values.includes(row[col]));
    }
  });

  // Get unique values for the specified column
  return [...new Set(filteredData.map(row => row[columnName]))].sort((a, b) => a - b);
};

export const applyFilters = (data: DataRow[], filters: FilterState): DataRow[] => {
  return data.filter(row => {
    return Object.entries(filters).every(([column, values]) => {
      if (values.length === 0) return true;
      return values.includes(row[column]);
    });
  });
}; 