import Head from 'next/head'
import { Container, Button, Row, Col, Nav } from 'react-bootstrap'
import styles from "../styles/Home.module.css"
import Link from 'next/link'

export default function Pricing() {

  return (
    <>

      <Head>
        <title>Pricing</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="Web and mobile app development company, we are building app development and custom software development solutions with the expert developer team."></meta>

        <meta property="og:url" content="https://www.mindasoft.com" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Pricing" />
        <meta property="og:description" content="Web and mobile app development company, we are building app development and custom software development solutions with the expert developer team." />
        <meta property="og:image" content="https://www.mindasoft.com/images/mindasoftlogo.png" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Pricing" />
        <meta name="twitter:description" content="Web and mobile app development company, we are building app development and custom software development solutions with the expert developer team." />
        <meta name="twitter:image" content="https://www.mindasoft.com/images/mindasoftlogo.png" />
        <link rel="canonical" href="https://www.mindasoft.com" />
      </Head>


      {/* Heading Section*/}
      <Container fluid className={styles.headingcontainer}>
        <Container>
          <h1 className={styles.headone} style={{ textAlign: "center" }}>Plans & Pricing</h1>
          <p className={styles.headtwo} style={{ textAlign: "center", paddingLeft: "100px", paddingRight: "100px" }}>
            Choose the best plan to fit your team’s needs. Get started for free. No credit card required.
          </p>
        </Container>

        <Container className='d-flex justify-content-center'>
          <Link href="/contact"><Button className={styles.headingbutton} size='lg'>Try it for free</Button></Link>
        </Container>

      </Container>


      <Container fluid className={styles.thirdcontainer}>
        <Container >
          <h1 className={styles.secondhead} style={{ paddingTop: "100px" }}>Pricing</h1>
          <p className={styles.secondpara}>
            Our free plan have the core features of the product and will mostly fit any company wants to add their invoices.
          </p>
        </Container>


        <Container className='mt-5 mb-5'>
          <Row>

            <Col lg={4}>
              <Container className={styles.cardsection}>
                <Container className='d-flex justify-content-center'>
                  <img src='/images/basic.png' width={200} height={200} />
                </Container>
                <h1 className={styles.gridhead} style={{ textAlign: "center", paddingTop: "10px" }}>Basic Plan</h1>
                <h2 style={{ textAlign: "center", fontSize: "23px", color: "green", fontWeight: "400" }}>Free</h2>
                <ul className='mt-3'>
                  <li><p className={styles.gridpara}>Products</p></li>
                  <li><p className={styles.gridpara}>Expenses</p></li>
                  <li><p className={styles.gridpara}>Invoices</p></li>
                  <li><p className={styles.gridpara}>Clients</p></li>
                  <li><p className={styles.gridpara}>Sales person (Only 1)</p></li>
                </ul>
                <Link href="/contact"><Button className={styles.headingbutton} size='lg' variant='success'>Get Basic Plan</Button></Link>
              </Container>
            </Col>

            <Col lg={4}>
              <Container className={styles.cardsection}>
                <Container className='d-flex justify-content-center'>
                  <img src='/images/standard.png' width={200} height={200} />
                </Container>
                <h1 className={styles.gridhead} style={{ textAlign: "center", paddingTop: "10px" }}>Standart Plan</h1>
                <h2 style={{ textAlign: "center", fontSize: "23px", color: "green", fontWeight: "400" }}>Monthly $5</h2>
                <ul className='mt-3'>
                  <li><p className={styles.gridpara}>Products</p></li>
                  <li><p className={styles.gridpara}>Expenses</p></li>
                  <li><p className={styles.gridpara}>Invoices</p></li>
                  <li><p className={styles.gridpara}>Clients</p></li>
                  <li><p className={styles.gridpara}>Sales person (Only 2)</p></li>
                  <li><p className={styles.gridpara}>Analytics</p></li>
                </ul>
                <Link href="/contact"><Button className={styles.headingbutton} size='lg'>Try Standart Plan</Button></Link>
              </Container>
            </Col>

            <Col lg={4}>
              <Container className={styles.cardsection}>
                <Container className='d-flex justify-content-center'>
                  <img src='/images/premium.png' width={200} height={200} />
                </Container>
                <h1 className={styles.gridhead} style={{ textAlign: "center", paddingTop: "10px" }}>Premium Plan</h1>
                <h2 style={{ textAlign: "center", fontSize: "23px", color: "green", fontWeight: "400" }}>Monthly $10</h2>
                <ul className='mt-3'>
                  <li><p className={styles.gridpara}>Products</p></li>
                  <li><p className={styles.gridpara}>Expenses</p></li>
                  <li><p className={styles.gridpara}>Invoices</p></li>
                  <li><p className={styles.gridpara}>Clients</p></li>
                  <li><p className={styles.gridpara}>Sales person</p></li>
                  <li><p className={styles.gridpara}>Analytics</p></li>
                  <li><p className={styles.gridpara}>ML Predictions</p></li>
                </ul>
                <Link href="/contact"><Button className={styles.headingbutton} size='lg'>Try Premium Plan</Button></Link>
              </Container>
            </Col>

          </Row>
        </Container>

      </Container>


      <Container fluid className={styles.pricingbottomcontainer}>
        <Container >

          <h1 className={styles.secondhead}>Start a free trial today.</h1>
          <p className={styles.secondpara}>
            You can try our super software for free 1 month. After 1 month we will charge you monthly $1
          </p>

        </Container>

        <Container className='d-flex justify-content-center align-items-center'>
          <Link href="/register" passHref><Nav.Link><span className={styles.services}><Button className={styles.navbarhireus} size='md' variant='success'>Build an account for free</Button></span></Nav.Link></Link>
        </Container>

      </Container>

    </ >
  )
}
