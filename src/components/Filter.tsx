import React, { useEffect, useState } from 'react';
import { Multiselect } from 'multiselect-react-dropdown';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../store';
import { setFilters, setFilteredData } from '../store/tableSlice';
import { getAvailableFilterOptions, applyFilters } from '../utils/dataUtils';
import type { FilterOption, DataRow, FilterState } from '../types';

interface FilterProps {
  columnName: string;
}

export const Filter: React.FC<FilterProps> = ({ columnName }) => {
  const dispatch = useDispatch();
  const { data, filters } = useSelector((state: RootState) => state.table as {
    data: DataRow[];
    filters: FilterState;
  });
  const [options, setOptions] = useState<FilterOption[]>([]);

  useEffect(() => {
    const availableOptions = getAvailableFilterOptions(data, columnName, filters);
    setOptions(availableOptions.filter(value => value !== undefined && value !== null).map(value => ({ id: value, text: value.toString() })));
  }, [data, filters, columnName]);

  const handleFilterChange = (selectedList: FilterOption[]) => {
    const newFilters = {
      ...filters,
      [columnName]: selectedList.map(option => option.id),
    };
    dispatch(setFilters(newFilters));
    
    const filteredData = applyFilters(data, newFilters);
    dispatch(setFilteredData(filteredData));
  };

  return (
    <div className="filter-container">
      <h3>{columnName}</h3>
      <Multiselect
        options={options}
        selectedValues={filters[columnName]?.map((value: number) => ({ id: value, text: value.toString() })) || []}
        onSelect={handleFilterChange}
        onRemove={handleFilterChange}
        displayValue="text"
        placeholder={`Select ${columnName}`}
        showCheckbox={true}
        closeOnSelect={false}
        avoidHighlightFirstOption={true}
        hidePlaceholder={true}
      />
    </div>
  );
}; 