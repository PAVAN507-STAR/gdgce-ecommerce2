import 'bootstrap/dist/css/bootstrap.min.css';
import './productcard.css';
import { frame,motion} from 'framer-motion';
import { useDispatch } from 'react-redux';
import { addToCart } from './cartSlice';

function Imgcard({ data }) {
  const ratingPercentage = (data.rating.rate / 5) * 100;
  
  const dispatch = useDispatch();
  
  //Passing the reducer obj to be dispatched to reducers store 
  const addtocart = () => {
    dispatch(addToCart(data));
  };

  return (
    <div className="card product-card shadow-sm">
      <div className="image-container">
        <img 
          src={data.image} 
          className="card-img-top product-img" 
          alt={data.title} 
        />
      </div>
      <div className="card-body">
        <h5 className="card-title">{data.title}</h5>
        <div className="star-rating">
          <div className="stars-outer">
            <div className="stars-inner" style={{ width: `${ratingPercentage}%` }}></div>
          </div>
          <span className="rating-count">({data.rating.count})</span>
        </div>
        <h5 className="price-badge">$ {data.price}</h5>
        <motion.button  onClick={addtocart} whileHover={{scale:1.1}} className='btn btn-dark add-to-cart'>Add to Cart</motion.button>
      </div>
    </div>
  );
}

export default Imgcard;
