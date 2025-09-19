import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";


export default function Cart() {
  const [cart, setCart] = useState([]);
  const [total, settotal] = useState(0)
  const token = localStorage.getItem('authtoken')
  

    const getCart = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5001/api/auth/getCart",
          { withCredentials: true }
        );
        setCart(res.data.product.items || []);
        settotal(res.data.totalPrice)
      } catch (error) {
        toast.error("API Connection Problem");
      }
    };

    useEffect(() => {
    getCart();
  }, []);


    const handleQuantity = async(productId, newQuantity)=> {
        if(newQuantity < 0){
          toast.warning('Quantity less then 1');
          return
        }  
      try{
        const res = await axios.post('http://localhost:5001/api/auth/updateCart', {productId, quantity:newQuantity}, {withCredentials:true})
        toast.success(res.data.message)
        getCart();
      }
      catch(error){
      toast.error('Api Connection Problem')
    }
     
    }

    const handleRemove = async (productId) =>{
      try{
        const res = await axios.post('http://localhost:5001/api/auth/removeCart', {productId}, {withCredentials:true})
        toast.success(res.data.message);
        getCart();
      }catch(error){
        toast.error('Api Connection Problem')
      }
    }

  

  return (
    <section className="max-w-5xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Your Cart 🛒</h1>

      {cart.length === 0 ? (
        <p className="text-gray-500 text-lg">Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between bg-white p-4 rounded-lg shadow"
              >
                {/* Product info */}
                <div className="flex items-center gap-4">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div>
                    <h2 className="text-lg font-semibold">{item.product.name}</h2>
                    <p className="text-gray-600">₹{item.product.price}</p>
                    <p className="text-gray-800 font-bold">
                      Subtotal: ₹{item.product.price * item.quantity}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3">
                  <button onClick={() => {handleQuantity(item.product._id, item.quantity-1)}} className="px-3 py-1 rounded text-white bg-red-500 hover:bg-red-600">
                    -
                  </button>
                  <span className="text-lg font-semibold">{item.quantity}</span>
                  <button onClick={() => {handleQuantity(item.product._id, item.quantity+1)}} className="px-3 py-1 rounded text-white bg-green-500 hover:bg-green-600">
                    +
                  </button>
                  <button onClick={() => {handleRemove(item.product._id)}} className="ml-4 text-red-500 hover:underline">
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Total */}
          <div className="mt-8 p-6 bg-white shadow rounded-lg text-right">
            <h2 className="text-xl font-bold">
              Total: ₹{total}
            </h2>
            <button className="mt-4 px-6 py-2 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700">
              Checkout
            </button>
          </div>
        </>
      )}
    </section>
  );
}
