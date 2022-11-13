import './App.css';
import { Companies } from './components/Companies/Companies';
import { Employees } from './components/Employees/Employees';
import { selectSelectedCompanies } from './app/slices/companiesSlice';
import { useSelector } from 'react-redux';



function App() {
  const selectedCompanies = useSelector(selectSelectedCompanies)
  return (

    <div className="App">
      <Companies />
      {selectedCompanies.length > 0 &&
        <Employees />}
    </div>


  );
}

export default App;
