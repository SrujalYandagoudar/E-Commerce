import { Navigate, Outlet } from "react-router-dom"
import {jwtDecode} from 'jwt-decode'

export default function ProtectedRoute({authRoles}) {
  const isToken = localStorage.getItem('authtoken')

  if(!isToken){
    return <Navigate to="/login" replace />
  }

  try{
    const decode = jwtDecode(isToken);
    const userRole = decode.role;

    if(authRoles && !authRoles.includes(userRole)){
      return <Navigate to="/unauth" replace />
    }

    return <Outlet/>

  }catch(error){
    return <Navigate to="/login" replace />
  }
}