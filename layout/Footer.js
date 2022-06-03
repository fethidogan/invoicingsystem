import React, { useState } from 'react'
import styles from "../styles/Home.module.css"
import { Container, Row, Col } from 'react-bootstrap'
import Link from 'next/link'

import 'react-toastify/dist/ReactToastify.css';

const Footer = () => {

    return (
        <>
            <Container fluid className={styles.footercontainer}>

                <Container >
                    <Row>

                        <Col className={styles.footerblog}>
                            <h3 className={styles.footertitles}>Product</h3>
                            <Link href="/features" passHref><a className={styles.footerparas}>Features</a></Link>
                            <Link href="/pricing" passHref><a className={styles.footerparas}>Pricing</a></Link>
                            <Link href="/pricing" passHref><a className={styles.footerparas}>Terms of use</a></Link>
                            <Link href="/pricing" passHref><a className={styles.footerparas}>Updates</a></Link>
                            <Link href="/how-it-works" passHref><a className={styles.footerparas}>How it works</a></Link>
                        </Col>


                        <Col className={styles.footerblog}>
                            <h3 className={styles.footertitles}>Company</h3>
                            <Link href="/who-we-are" passHref><a className={styles.footerparas}>Our Mission</a></Link>
                            <Link href="/who-we-are" passHref><a className={styles.footerparas}>Team</a></Link>
                            <Link href="/who-we-are" passHref><a className={styles.footerparas}>Careers</a></Link>
                            <Link href="/who-we-are" passHref><a className={styles.footerparas}>Contact</a></Link>
                        </Col>

                        <Col className={styles.footerblog} style={{ marginTop: "80px" }}>
                            <Container className='d-flex justify-content-between'>
                                <Link href="https://www.apple.com" passHref><a><img src='/images/footer-app-store.svg' width={150} height={50} /></a></Link>
                                <Link href="https://www.google.com" passHref><a><img src='/images/footer-google-play.svg' width={150} height={50} /></a></Link>
                            </Container>
                        </Col>
                    </Row>
                </Container>

                <img src='/images/wave.svg' className={styles.footerwave} />

            </Container>
        </>
    )
}

export default Footer