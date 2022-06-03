import React, { useState, useEffect } from 'react';
import Head from 'next/head'
import {useRouter} from 'next/router'
import { Container, Button, Row, Col, Nav, Form } from 'react-bootstrap'
import styles from "../styles/Home.module.css"
import axios from 'axios'


function HandleErrors({ error }) {
    return (
        <div className='d-flex justify-content-center mt-4'>
            <p style={{ color: "red" }}>{error}</p>
        </div>
    )
}

export default function ResetPassword() {
    const [email, setEmail] = useState("")
    const [error, setError] = useState("")
    const router = useRouter()
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.post('/api/resetpass', { email });
            router.push('/')
        } catch (err) {
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

                        <Button className="btn btn-success" type='submit' size='lg'>Reset Password</Button>

                    </Form>

                    <HandleErrors error={error} />

                </Container>
            </Container>

        </ >
    )
}
