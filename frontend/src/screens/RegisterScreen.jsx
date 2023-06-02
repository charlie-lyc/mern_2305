import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'

import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useRegisterMutation } from '../slices/usersApiSlice'
import { setCredentials } from '../slices/authSlice'
import { toast } from 'react-toastify'

import Loader from '../components/Loader'

import { LinkContainer } from 'react-router-bootstrap'


const RegisterScreen = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { userInfo } = useSelector((state) => state.auth)
    const [ register, { isLoading, error } ] = useRegisterMutation()

    useEffect(() => {
        if (userInfo) {
            navigate('/')
        }
    }, [navigate, userInfo])

    const submitHandler = async (e) => {
        e.preventDefault()
        // console.log('submit')

        /**
         * Validate password
         */
        if (password !== confirmPassword) {
            toast.error('Passwords do not match')
        } else {
            try {
                const res = await register({ name, email, password }).unwrap()
                // console.log(res)
                dispatch(setCredentials(res))
                toast.success('New user registered.')
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
    }

    return (
        // <div>RegisterScreen</div>
        //////////////////////////////////////////////////////////////
        <FormContainer>

            <h1>Sign Up</h1>

            <Form onSubmit={ submitHandler }>
                <Form.Group className='my-2' controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter name'
                        value={ name }
                        onChange={(e) => setName(e.target.value)} 
                    />
                </Form.Group>
                <Form.Group className='my-2' controlId='email'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Enter email'
                        value={ email }
                        onChange={(e) => setEmail(e.target.value)} 
                    />
                </Form.Group>
                <Form.Group className='my-2' controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Enter password'
                        value={ password }
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                </Form.Group>
                <Form.Group className='my-2' controlId='confirmPassword'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Confirm password'
                        value={ confirmPassword }
                        onChange={(e) => setConfirmPassword(e.target.value)} 
                    />
                </Form.Group>

                {/* { isLoading && <h3>Loading ... </h3> } */}
                {/* ////////////////////////////////////// */}
                {   isLoading && <Loader /> }

                <Button
                    type='submit'
                    variant='primary'
                    className='mt-3'
                    disabled={ isLoading } 
                >Register</Button>

                &nbsp;
                <LinkContainer to='/'>
                    <Button variant='danger' className='mt-3'>Cancel</Button>
                </LinkContainer>

            </Form>

            <Row className='py-3'>
                <Col>
                    Already have an account? <Link to='/login'>Log In</Link>
                </Col>
            </Row>

        </FormContainer>
    )
}

export default RegisterScreen