import { Container, Card, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

import { useNavigate } from 'react-router-dom'
import { NavDropdown, Badge } from 'react-bootstrap'
import { ImProfile } from 'react-icons/im'
import { FaSignOutAlt } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { useLogoutMutation } from '../slices/usersApiSlice'
import { clearCredentials } from '../slices/authSlice'
import { toast } from 'react-toastify'


const Hero = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { userInfo } = useSelector((state) => state.auth)
    const [ logout, { isLoading, error } ] = useLogoutMutation()

    const logoutHandler = async () => {
        // console.log('logout')
        try {
            await logout().unwrap()
            dispatch(clearCredentials())
            navigate('/')
        } catch (err) {
            // console.log(import.meta.env.VITE_NODE_ENV)
            if (import.meta.env.VITE_NODE_ENV === 'development') {
                console.log(err?.data?.message || err?.error)
            }
            /////////////////////////////////////////////////////////
            toast.error(err?.data?.message || err?.error)
        }
    }

    return (
    <div className='py-5'>
        <Container className='d-flex justify-content-center'>
            <Card className='p-5 d-flex flex-column align-items-center hero-card bg-light w-75'>
                <h1 className='text-center mb-4'>MERN Authentication</h1>
                <p className='text-center mb-4'>
                    This is a boilerplate for MERN authentication that stores a JWT in
                    an HTTP-Only cookie. It also uses Redux Toolkit and the React
                    Bootstrap library
                </p>
                <div className='d-flex'>

                    {/* 
                        <Button variant='primary' href='/login' className='me-3'>
                            Sign In
                        </Button>
                        <Button variant='secondary' href='/register'>
                            Sign Up
                        </Button> 
                    */}
                    {/* ////////////////////////////////////////////////////////// */}
                    {/* 
                        <LinkContainer to='/login'>
                            <Button variant='primary' className='me-3'>
                                Sign In
                            </Button>
                        </LinkContainer>
                        <LinkContainer to='/register'>
                            <Button variant='secondary'>
                                Sign Up
                            </Button>
                        </LinkContainer> 
                    */}
                    {/* ////////////////////////////////////////////////////////// */}
                    {userInfo ?
                        <>
                            <LinkContainer to='/profile'>
                                <Button variant='primary' className='me-3'>
                                    Profile
                                </Button>
                            </LinkContainer>
                            <Button variant='secondary' onClick={ logoutHandler }>
                                Logout
                            </Button>
                        </>
                        :
                        <>
                            <LinkContainer to='/login'>
                                <Button variant='primary' className='me-3'>
                                    Sign In
                                </Button>
                            </LinkContainer>
                            <LinkContainer to='/register'>
                                <Button variant='secondary'>
                                    Sign Up
                                </Button>
                            </LinkContainer>
                        </>
                    }

                </div>
            </Card>
        </Container>
    </div>
    )
}

export default Hero