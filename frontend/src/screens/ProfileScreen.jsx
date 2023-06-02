import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'

import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useUpdateProfileMutation } from '../slices/usersApiSlice'
import { setCredentials } from '../slices/authSlice'
import { toast } from 'react-toastify'

import Loader from '../components/Loader'

import { LinkContainer } from 'react-router-bootstrap'


const ProfileScreen = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { userInfo } = useSelector((state) => state.auth)
    const [ updateProfile, { isLoading, error } ] = useUpdateProfileMutation()

    useEffect(() => {
        /**
         * User logged in already at this moment,
         * because of using '<PrivateRoute></PrivateRoute>'
         */
        setName(userInfo.name)
        setEmail(userInfo.email)
    }, [userInfo.name, userInfo.email])

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
                const res = await updateProfile({ name, email, password }).unwrap()
                // console.log(res)
                dispatch(setCredentials(res))
                toast.success('Profile updated.')
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
        // <div>ProfileScreen</div>
        //////////////////////////////////////////////////////////////
        <FormContainer>

            <h1>Profile</h1>

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
                    <Form.Label>New Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Enter new password'
                        value={ password }
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                </Form.Group>
                <Form.Group className='my-2' controlId='confirmPassword'>
                    <Form.Label>Confirm New Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Confirm new password'
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
                >Update</Button>
                
                &nbsp;
                <LinkContainer to='/'>
                    <Button variant='danger' className='mt-3'>Cancel</Button>
                </LinkContainer>
            </Form>

        </FormContainer>

    )
}

export default ProfileScreen