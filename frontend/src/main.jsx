import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import 'bootstrap/dist/css/bootstrap.min.css'
import { 
    createBrowserRouter, 
    createRoutesFromElements, 
    Route, 
    RouterProvider, 

} from 'react-router-dom'
import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'

import { Provider } from 'react-redux'
import store from './store'

import ProfileScreen from './screens/ProfileScreen'
import PrivateRoute from './components/PrivateRoute'


const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={ <App /> }>
            <Route index={ true } path='/' element={ <HomeScreen /> } />
            <Route path='/login' element={ <LoginScreen /> } />
            <Route path='/register' element={ <RegisterScreen /> } />

            {/* <Route path='/profile' element={ <ProfileScreen />} /> */}
            {/* ////////////////////////////////////////////////////// */}
            <Route element={ <PrivateRoute /> }>
                <Route path='/profile' element={ <ProfileScreen /> } />
            </Route>

        </Route>
    )
)

ReactDOM.createRoot(document.getElementById('root')).render(
    
    // <React.StrictMode>
    // 
    //     {/* <App /> */}
    //     {/* /////// */}
    //     <RouterProvider router={ router } />
    // 
    // </React.StrictMode>
    //////////////////////////////////////////////
    <Provider store={ store }>
        <React.StrictMode>
            <RouterProvider router={ router } />
        </React.StrictMode>
    </Provider>

)

