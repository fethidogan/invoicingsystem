import { Container, Button, Row, Col, Nav, Form } from 'react-bootstrap'
import React, { useState, useEffect, useContext } from 'react';
import styles from "../styles/Home.module.css"
import Link from 'next/link'
import axios from 'axios'
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { Store } from "../utils/store"


function HandleErrors({ error }) {
    return (
        <div className='d-flex justify-content-center mt-4'>
            <p style={{ color: "red" }}>{error}</p>
        </div>
    )
}


export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const router = useRouter()

    const { state, dispatch } = useContext(Store);
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.post('/api/login', {
                email,
                password,
            })

            dispatch({ type: "USER_LOGIN", payload: data.email })
            dispatch({ type: "LOGGED_COMPANY", payload: data.company })

            Cookies.set('userMail', data.email, { expires: 5 })
            Cookies.set('token', data.token, { expires: 5 })
            Cookies.set('company', data.company, { expires: 5 })
            router.push('/app/products')

        } catch (err) {
            setError(err.response.data.message)
        }
    }
    

    return (
        <>
            <Container fluid className={styles.logincontainer}>

                <Container className={styles.loginform}>
                    <h1 className={styles.bottlelogo} style={{ textAlign: "center" }}>Sellbill</h1>
                    <hr />
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Email adress" size='lg' value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" size='lg' value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </Form.Group>

                        <Button className="btn btn-success" type='submit' size='lg'>Login</Button>

                        <Link href="/register" passHref><a style={{ marginLeft: "20px" }}>Don't have an account</a></Link>
                        <Link href="/reset-password" passHref><a style={{ marginLeft: "20px" }}>Reset Password</a></Link>

                    </Form>

                    <HandleErrors error={error} />

                    {/* Google Sign in */}
                    <Container className='d-flex justify-content-center mt-4'>
                        <p>Sign in Using</p>
                    </Container>

                    <Container className='d-flex justify-content-center'>
                        <img src="/images/google-sign.png" width={50} height={50} />
                    </Container>

                </Container>
            </Container>

        </ >
    )
}
