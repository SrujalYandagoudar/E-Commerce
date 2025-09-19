import { useEffect, useState } from "react"
import axios from 'axios'
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom"

export default function Login() {
  const [username, setusername] = useState('');
  const [password, setPassword] = useState('');
  const [logout, setlogout] = useState(false)
  const route = useNavigate();



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5001/api/auth/login', { username, password }, { withCredentials: true })
      if (res.data.status === 201 || res.status === 201) {
        toast.success(res.data.message);
        

        if (res.data.token) {
          localStorage.setItem('authtoken', res.data.token)
          setInterval(() => {
            window.location.reload();
            
          }, 3000);
          if(res.data.exist.role=== 'admin'){
            route('/AdminDashboard')
          }else{
            route('/')
          }
        }
      } else {
        toast.error(res.data.message)
      }

    }
    catch (error) {
      toast.error("Something went wrong ❌")
    }
  }


  const handleLogout = async (e) => {
    try {
      const res = await axios.post('http://localhost:5001/api/auth/logOut', {}, { withCredentials: true })
      toast.success(res.data.message)

    } catch (error) {
      toast.error('Api Error')
    }
  }





  return (
     <section className="bg-gradient-to-r from-orange-400 to-pink-500 text-white py-20 flex justify-center items-center flex-col  text-center h-screen" >
      <h2 className="text-4xl font-bold mb-4">Welcome to ShopEase</h2>
      <p className="mb-6 text-lg">Find the best products at affordable prices.</p>
      <button className="bg-white text-orange-600 font-semibold px-6 py-2 rounded-lg shadow hover:bg-gray-200">
        <Link to='/products'>Shop Now</Link>
      </button>
    </section>

  )
}
