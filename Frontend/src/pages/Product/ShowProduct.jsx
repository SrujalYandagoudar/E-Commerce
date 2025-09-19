import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function ShowProduct() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const showProducts = async () => {
      try {
        const res = await axios.get('http://localhost:5001/api/auth/showProducts') 
        setProducts(res.data.showProduct || []) // make sure it's an array
      } catch (error) {
        toast.error('API problem ❌')
      }
    }
    showProducts()
  }, [])

  const handleWishlist = async(productId) => {
      try{
        const res = await axios.post('http://localhost:5001/api/auth/addWishlist', {productId}, {withCredentials:true});
        toast.success(res.data.message)
        console.log(res.data.Wishlist)
      }catch(error){
        toast.error('Api Connection Problem')
        console.log(error)
      }
  }

  return (
    <section className="py-6">
      <h1 className="font-semibold text-3xl text-center mb-6">Products</h1>

      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-6">
          {products.map((product, index) => (
            
            <div  className=''>
                <div key={index} className="border rounded-lg p-4 shadow-md hover:shadow-lg transition">
             <Link to={`/products/${product._id}`} className=""  >
               <img
                src={product.image}
                alt={product.name}
                className="h-40 w-full object-cover rounded-md mb-3"
              />
              <h2 className="font-bold text-lg">{product.name}</h2>
              <p className="text-gray-600 text-sm">{product.discription}</p>
              <p className="font-semibold text-orange-600 mt-2">₹{product.price}</p>
              <p className="text-sm text-gray-500">Stock: {product.stock}</p>
              <p className="text-sm">⭐ {product.ratings}</p>

             </Link>
              <button className='' onClick={()=>{handleWishlist(product._id)}}>Add Wishlist</button>
              
            </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-600">
          <h2>No Products Available</h2>
        </div>
      )}
    </section>
  )
}
