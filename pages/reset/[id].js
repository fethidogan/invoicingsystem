import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import Head from 'next/head'
import { Container, Button, Row, Col, Nav, Form } from 'react-bootstrap'
import styles from "../../styles/Home.module.css"
import User from "../../models/user"
import dbConnect from '../../utils/db'
import axios from 'axios'


export default function ResetPassword({ id }) {
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const router = useRouter()


    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.post('/api/changepass', { id, password })
            router.push('/')
        } catch (err) {
            console.log(err.response.data.message)
        }
    }

    return (
        <>
            <Head>
                <title>ResetPassword</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <meta name="description" content="Web and mobile app development company, we are building app development and custom software development solutions with the expert developer team."></meta>

                <meta property="og:url" content="https://www.mindasoft.com" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="ResetPassword" />
                <meta property="og:description" content="Web and mobile app development company, we are building app development and custom software development solutions with the expert developer team." />
                <meta property="og:image" content="https://www.mindasoft.com/images/mindasoftlogo.png" />

                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="ResetPassword" />
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
                            <Form.Label>Reset Password</Form.Label>
                            <Form.Control type="password" placeholder="New Password" size='lg' value={password} onChange={(e) => setPassword(e.target.value)} minLength="6" required />
                        </Form.Group>

                        <Button className="btn btn-success" type='submit' size='lg'>Reset Password</Button>
                    </Form>

                </Container>
            </Container>

        </ >


    )
}

export async function getServerSideProps({ params, res }) {
    await dbConnect();
    const { id } = params;
    const user = await User.findOne({ resetToken: id }).lean()
    if (!user) {
        return {
            notFound: true
        }

    } else {
        return {
            props: {
                id: id
            },
        };
    }
}
