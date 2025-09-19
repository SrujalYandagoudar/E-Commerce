import axios from "axios";
import { useState } from "react";
import { useEffect } from "react"
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function Navbar() {
  const [isLogin, setisLogin] = useState(false);

  useEffect(() => {
    const check = () => {
      const token = localStorage.getItem('authtoken');
    if(token){
      setisLogin(true)
    }else{
      setisLogin(false)
    }
    }
    check();
  }, [])

  const handleLogout = async(e) => {
    try{
      const res = await axios.post('http://localhost:5001/api/auth/logOut', {}, {withCredentials:true})
      
      if(res.data.status === 201 || res.status ===  201){
        localStorage.removeItem("authtoken")
        setisLogin(false)

      toast.success(res.data.message)
      }else{
        toast.error(res.data.message)
      }

    }catch(error){
      toast.error(error)
    }
  }
  

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 flex justify-between items-center py-3">
        <h1 className="text-2xl font-bold text-orange-600">ShopEase</h1>
        <ul className="flex gap-6 text-gray-700">
          <li className="hover:text-orange-600 cursor-pointer"><Link to="/">Home</Link></li>
          <li className="hover:text-orange-600 cursor-pointer"><Link to='/products'>Shop</Link></li>
          <li className="hover:text-orange-600 cursor-pointer">About</li>
          <li className="hover:text-orange-600 cursor-pointer"><Link to='/Cart'>Cart</Link></li>
          <li className="hover:text-orange-600 cursor-pointer">Contact</li>
          {!isLogin ? (<button><Link to='/Login'>Log In</Link> </button>) : (<button onClick={handleLogout} className="">Log Out</button>) }
          

        </ul>
      </div>
    </nav>
  )
}
