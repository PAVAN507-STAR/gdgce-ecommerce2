import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import store from './components/store';
import MyNavbar from './components/navbar';
import Home from './components/home';
import Cart from './components/Cart';
import NotFound from './components/NotFound'; // Not Found component
import { Provider } from 'react-redux';
import SearchPage from './components/SearchPage';
import { useEffect,useState } from 'react';


function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="row">
        {Array(10).fill().map((_, i) => (
          <div key={i} className="col-md-4 col-sm-6 col-lg-3 mb-4">
            <div className="skeleton-card"></div> {/* Skeleton loader */}
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Provider store={store}>
    <Router>
      <MyNavbar />
      <main className="mt-4">
        <Routes>
          <Route path="/" element={<Home products={products} />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/search" element={<SearchPage products={products}/>}/>
          <Route path="*" element={<NotFound />} /> {/* 404 route */}
        </Routes>
      </main>
    </Router>
    </Provider>
  );
}

export default App;
