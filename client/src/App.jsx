import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Home from './elements/Home';
import Create from './elements/Create';
import Read from './elements/Read';
import Edit from './elements/Edit';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} /> {/* Set the home page path */}
        <Route path='/create' element={<Create />} />
        <Route path='/edit/:id' element={<Edit />} />
        <Route path='/read/:id' element={<Read />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
