import React, { useState, useEffect } from 'react';
import Head from 'next/head'
import { Container, Button, Row, Col, Nav, Form } from 'react-bootstrap'
import styles from "../styles/Home.module.css"
import Link from 'next/link'
import { useRouter } from 'next/router'
import axios from 'axios'

// handle error component
function HandleErrors({ error }) {
    return (
        <div className='d-flex justify-content-center mt-4'>
            <p style={{ color: "red" }}>{error}</p>
        </div>
    )
}

export default function Register() {
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [company, setCompany] = useState("")
    const [password, setPassword] = useState("")
    const [passconfirm, setPassConfirm] = useState("")
    const [error, setError] = useState("")


    const handleSubmit = async (e) => {
        e.preventDefault()
        if (password !== passconfirm) {
            setError("Passwords doesn't match")
            return
        }
        // reset error
        setError("")

        // send data
        try {
            await axios.post('/api/signup', { email, company, password })
            router.push('/email-sent/');
        }
        catch (err) {
            // get error message
            setError(err.response.data.message)
        }
    }

    return (
        <>
            <Head>
                <title>Register</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <meta name="description" content="Web and mobile app development company, we are building app development and custom software development solutions with the expert developer team."></meta>

                <meta property="og:url" content="https://www.mindasoft.com" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="Register" />
                <meta property="og:description" content="Web and mobile app development company, we are building app development and custom software development solutions with the expert developer team." />
                <meta property="og:image" content="https://www.mindasoft.com/images/mindasoftlogo.png" />

                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Register" />
                <meta name="twitter:description" content="Web and mobile app development company, we are building app development and custom software development solutions with the expert developer team." />
                <meta name="twitter:image" content="https://www.mindasoft.com/images/mindasoftlogo.png" />
                <link rel="canonical" href="https://www.mindasoft.com" />
            </Head>


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
                            <Form.Label>Company Name</Form.Label>
                            <Form.Control type="text" placeholder="Company Name" size='lg' value={company} onChange={(e) => setCompany(e.target.value)} minLength="4" required />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" size='lg' value={password} onChange={(e) => setPassword(e.target.value)} minLength="8" required />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Password Confirm</Form.Label>
                            <Form.Control type="password" placeholder="Password" size='lg' value={passconfirm} onChange={(e) => setPassConfirm(e.target.value)} minLength="8" required />
                        </Form.Group>

                        <Button className="btn btn-success" type='submit' size='lg'>Register</Button>

                        <Link href="/login" passHref><a style={{ marginLeft: "50px" }}>Have an account ?</a></Link>

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
