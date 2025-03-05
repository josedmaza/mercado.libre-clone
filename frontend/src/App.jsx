import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Header from './components/Header/Header';
import SearchResults from './pages/SearchResults';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/items' element={<SearchResults />} />
        <Route path='/items/:id' element={<ProductDetail />} />
      </Routes>
    </>
  );
}
export default App;
