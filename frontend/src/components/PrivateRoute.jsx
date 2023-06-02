import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'


const PrivateRoute = () => {
    const { userInfo } = useSelector((state) => state.auth)

    return (
        // <div>PrivateRoute</div>
        //////////////////////////
        userInfo ? <Outlet /> : <Navigate to='/login' replace/>
    )
}

export default PrivateRoute