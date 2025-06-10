import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import { setData } from './store/tableSlice';
import { loadCSVData } from './utils/dataUtils';
import { Filter } from './components/Filter';
import { DataTableComponent } from './components/DataTable';
import './App.css';

function App() {
  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await loadCSVData('/dataset_large.csv');
        store.dispatch(setData(data));
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };
    loadData();
  }, []);

  return (
    <Provider store={store}>
      <div className="app-container">
        <header>
          <h1>Business Intelligence Dashboard</h1>
        </header>
        <main>
          <div className="filters-section">
            <Filter columnName="mod350" />
            <Filter columnName="mod8000" />
            <Filter columnName="mod20002" />
          </div>
          <div className="table-section">
            <DataTableComponent />
          </div>
        </main>
      </div>
    </Provider>
  );
}

export default App;
