import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function ProductById() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setquantity] = useState(1)

  useEffect(() => {
    const handleProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5001/api/auth/showProducts/${id}`);
        setProduct(res.data.product);
      } catch (error) {
        toast.error('API NOT CONNECTED');
      }
    };
    handleProduct();
  }, [id]); 

  const addToCart = async() =>{
    try{
      const res = await axios.post('http://localhost:5001/api/auth/addCart', {productId:product._id, quantity:quantity}, {withCredentials:true})
      if(res.status === 201){
        toast.success(quantity +" "+ product.name +" "+ res.data.message)
      }else{
        toast.error(res.data.message)
      }


    }catch(error){
      toast.error("Api Connection Problem")
    }
  }

  if (!product) {
    return (
      <section className="flex justify-center items-center min-h-screen">
        <h1 className="text-xl font-semibold text-gray-600">Loading product...</h1>
      </section>
    );
  }

  return (
    <section className="max-w-4xl mx-auto py-10 px-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.name}</h1>
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-80 object-cover rounded-lg shadow-md mb-6"
      />
      <p className="text-gray-600 mb-4">{product.discription}</p>
      <p className="text-lg font-semibold text-gray-800">₹ {product.price}</p>
      <p className="text-sm text-gray-500 mt-2">Category: {product.category}</p>
      <p className="text-sm text-gray-500">In Stock: {product.stock}</p>
      <p className="text-sm text-yellow-500">⭐ {product.ratings}</p>

      <div className="flex gap-10 items-center">
        <button disabled={quantity <1}  onClick={e => setquantity(quantity-1)}>-</button>
      <p className="text-sm text-gray-500">Quantity: {quantity}</p>
      <button onClick={e => setquantity(quantity+1)}>+</button>
      </div>

      <button onClick={addToCart} type="button" className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Add TO Cart</button>

    </section>
  );
}
