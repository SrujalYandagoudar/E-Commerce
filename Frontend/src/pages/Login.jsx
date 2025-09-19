import { useEffect, useState } from "react"
import axios from 'axios'
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom"

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-orange-400 to-pink-500">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login to ShopEase</h2>
        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="block text-gray-600 mb-1">Email</label>
            <input
              type="text"
              value={username}
              onChange={e => setusername(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>
          {/* Password */}
          <div>
            <label className="block text-gray-600 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>
          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-orange-600 text-white py-2 rounded-lg font-semibold hover:bg-orange-700 transition"
          >
            Login
          </button>
        </form>
        <p className="text-center text-gray-600 mt-5">
          Don’t have an account?{" "}
          <a href="/SignUp" className="text-orange-600 font-semibold hover:underline">
            Sign up
          </a>
        </p>
      </div>

    </div>
  )
}
