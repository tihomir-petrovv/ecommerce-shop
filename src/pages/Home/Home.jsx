import { useContext } from 'react';
import { CartContext } from '../../components/context/CartContext/CartContext';
import "./Home.css"
import { setItemsToUserCart } from '../../services/UserServices/cart-services';
import { AppContext } from '../../components/context/UserContext/UserContext';


export default function Home () {
    const { user } = useContext(AppContext)
    const { products } = useContext(CartContext)

    const addToCart = (product) => {
        setItemsToUserCart(user.uid, product)
    }
  
    if(!products) {
      return <h1>Loading...</h1>
    }


  return (
    <div>
      {/* <h1>Home Page</h1> */}
      <div id='items'>
        {products.map(product => (
          <div key={product.id} className='item'>
            <img src={product.image} alt={product.title} />
            <h2>{product.title}</h2>
            <p>${product.price}</p>
            <button onClick={() => addToCart(product)}>Add to cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}

