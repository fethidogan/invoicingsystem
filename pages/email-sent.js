import Head from 'next/head'
import { Container, Button, Row, Col, Nav } from 'react-bootstrap'
import styles from "../styles/Home.module.css"
import Link from 'next/link'


export default function Features() {

  return (
    <>

      <Head>
        <title>Features</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="Web and mobile app development company, we are building app development and custom software development solutions with the expert developer team."></meta>

        <meta property="og:url" content="https://www.mindasoft.com" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Features" />
        <meta property="og:description" content="Web and mobile app development company, we are building app development and custom software development solutions with the expert developer team." />
        <meta property="og:image" content="https://www.mindasoft.com/images/mindasoftlogo.png" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Features" />
        <meta name="twitter:description" content="Web and mobile app development company, we are building app development and custom software development solutions with the expert developer team." />
        <meta name="twitter:image" content="https://www.mindasoft.com/images/mindasoftlogo.png" />
        <link rel="canonical" href="https://www.mindasoft.com" />
      </Head>




      {/* Heading Section*/}
      <Container fluid className={styles.headingcontainer}>

        <Container>
          <h1 className={styles.headone} style={{ textAlign: "center" }}>Confirmation Mail Sent</h1>
          <p className={styles.headtwo} style={{ textAlign: "center", paddingLeft: "100px", paddingRight: "100px", paddingBottom:"200px" }}>
            Please check your spam folder in your inbox we have sent you a confirmation link.
          </p>
        </Container>

      </Container>




    </ >
  )
}
