import { useContext, useEffect, useState } from "react"
import { AppContext } from "../../components/context/UserContext/UserContext"
import { getUserCart, removeItemFromUserCart } from "../../services/UserServices/cart-services"

export default function Cart () {
    const { user } = useContext(AppContext)
    const [cart, setCart] = useState([])

    useEffect(() => {
        if (user) {
            getUserCart(user.uid).then((snapshot) => {
                setCart(snapshot)
            })
        }
    }, [user])

    const removeItem = (product) => {
        removeItemFromUserCart(user.uid, product)
        setCart(cart.filter((item) => item.id !== product.id))
    }

    return (
        <div>
            {cart.length > 0 ? (
                <div>
                    {cart.map((item) => (
                        <div key={item.id} className='item'>
                        <img src={item.image} alt={item.title} />
                        <h2>{item.title}</h2>
                        <p>${item.price}</p>
                        <button onClick={() => removeItem(item)}>Remove from cart</button>
                      </div>
                    ))}
                </div>
            ) : (
                <p>Your cart is empty</p>
            )}
        </div>
    )
}