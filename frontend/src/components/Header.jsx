import { Navbar, Nav, Container } from 'react-bootstrap'
import { FaSignInAlt, FaUserPlus } from 'react-icons/fa'

import { LinkContainer } from 'react-router-bootstrap'

import { useNavigate } from 'react-router-dom'
import { NavDropdown, Badge } from 'react-bootstrap'
import { ImProfile } from 'react-icons/im'
import { FaSignOutAlt } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { useLogoutMutation } from '../slices/usersApiSlice'
import { clearCredentials } from '../slices/authSlice'
import { toast } from 'react-toastify'


const Header = () => {
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
        <header>
            <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
                <Container>

                    {/* <Navbar.Brand href='/'>MERN App</Navbar.Brand> */}
                    {/* ////////////////////////////////////////////// */}
                    <LinkContainer to='/'>
                        <Navbar.Brand>MERN App</Navbar.Brand>
                    </LinkContainer>

                    <Navbar.Toggle aria-controls='basic-navbar-nav' />
                    <Navbar.Collapse id='basic-navbar-nav'>
                        <Nav className='ms-auto'>

                            {/* 
                                <Nav.Link href='/login'>
                                    <FaSignInAlt /> Sign In
                                </Nav.Link>
                                <Nav.Link href='/register'>
                                    <FaUserPlus /> Sign Up
                                </Nav.Link> 
                            */}
                            {/* /////////////////////////////////////// */}
                            {/* 
                                <LinkContainer to='/login'>
                                    <Nav.Link>
                                        <FaSignInAlt /> Sign In
                                    </Nav.Link>
                                </LinkContainer>
                                <LinkContainer to='/register'>
                                    <Nav.Link>
                                        <FaUserPlus /> Sign Up
                                    </Nav.Link>
                                </LinkContainer> 
                            */}
                            {/* /////////////////////////////////////// */}
                            {/* { userInfo ? <></> : <></> } */}
                            {userInfo ? 
                                <NavDropdown title={ userInfo.name } id='username'>
                                    <LinkContainer to='/profile'>
                                        <NavDropdown.Item>
                                            <ImProfile /> Profile
                                        </NavDropdown.Item>
                                    </LinkContainer>
                                        <NavDropdown.Item onClick={ logoutHandler }>
                                            <FaSignOutAlt /> Logout
                                        </NavDropdown.Item>
                                </NavDropdown>
                                :
                                <>
                                    <LinkContainer to='/login'>
                                        <Nav.Link>
                                            <FaSignInAlt /> Sign In
                                        </Nav.Link>
                                    </LinkContainer>
                                    <LinkContainer to='/register'>
                                        <Nav.Link>
                                            <FaUserPlus /> Sign Up
                                        </Nav.Link>
                                    </LinkContainer>
                                </>
                            }

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header