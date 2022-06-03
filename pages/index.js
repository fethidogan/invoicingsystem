import Head from 'next/head'
import { Container, Button, Row, Col, Nav } from 'react-bootstrap'
import styles from "../styles/Home.module.css"
import Link from 'next/link'
import { AiFillStar } from "react-icons/ai"

export default function Home() {

  return (
    <>

      {/* Heading Section*/}
      <Container fluid className={styles.headingcontainer}>
        <Container>
          <Row>
            <Col>
              <h1 className={styles.headone}>All of your details are <br /> in one place</h1>
              <p className={styles.headtwo}>
                Invoices, expenses, clients and statics of your business, All of them is in one place.
                You can try our service free as long as you want.
              </p>
              <Link href="/register" passHref><Nav.Link><Button className={styles.navbarhireus} size='md' variant='success'>Register for Free</Button></Nav.Link></Link>
            </Col>

            <Col className='d-flex justify-content-center align-items-center'>
              <img src='/images/headerimg.png' width={480} height={380} style={{ marginTop: "-100px" }} />
            </Col>

          </Row>
        </Container>
      </Container>

      <Container className='mt-5 mb-5'>
        <Row>
          <Col xs={6} sm={4} md={4} lg={2}><img className={styles.swing} src='/images/logo1.png' height={80} width={150} /></Col>
          <Col xs={6} sm={4} md={4} lg={2}><img className={styles.swing} src='/images/logo2.png' height={80} width={150} /></Col>
          <Col xs={6} sm={4} md={4} lg={2}><img className={styles.swing} src='/images/logo3.png' height={80} width={150} /></Col>
          <Col xs={6} sm={4} md={4} lg={2}><img className={styles.swing} src='/images/logo4.svg' height={80} width={150} /></Col>
          <Col xs={6} sm={4} md={4} lg={2}><img className={styles.swing} src='/images/logo2.png' height={80} width={150} /></Col>
          <Col xs={6} sm={4} md={4} lg={2}><img className={styles.swing} src='/images/logo4.svg' height={80} width={150} /></Col>

        </Row>
      </Container>

      <Container fluid className={styles.secondcontainer}>
        <Container >

          <h1 className={styles.secondhead}>Ready to speed up progress.</h1>
          <p className={styles.secondpara}>
            We collected all of your invoices, purchase invoices and statics in one place to speed up your progress.
            Your employees will work pro efficient with our software.
          </p>

        </Container>


        <Container className='d-flex justify-content-center align-items-center'>
          <img src='/images/speed.png' width={550} height={410} style={{ marginTop: "-10px" }} />
        </Container>

        <Container className='d-flex justify-content-center align-items-center'>
          <Row>
            <Col><AiFillStar color='#FFD700' size={50} /></Col>
            <Col><AiFillStar color='#FFD700' size={50} /></Col>
            <Col><AiFillStar color='#FFD700' size={50} /></Col>
            <Col><AiFillStar color='#FFD700' size={50} /></Col>
            <Col><AiFillStar color='#FFD700' size={50} /></Col>
          </Row>
        </Container>

      </Container>

      <Container fluid className={styles.thirdcontainer}>
        <Container >
          <h1 className={styles.secondhead} style={{ paddingTop: "100px" }}>What makes us unique?.</h1>
          <p className={styles.secondpara}>
            We all know time is money so we collected all of the things that you need in your business in one place to take the heavy lifting on your shoulders.
          </p>
        </Container>
        <Container className='d-flex justify-content-center align-items-center'>
          <Link href="/features" passHref><Nav.Link><span style={{ fontSize: "20px", color: "blue" }}>Discover our unique features</span></Nav.Link></Link>
        </Container>

        <Container className='mt-5'>
          <Row>
            <Col lg={6}>
              <Container >
                <h1 className={styles.gridhead} >Invoices</h1>
                <p className={styles.gridpara}>
                  Create invoices in under 1 minute. Unlike other softwares our software are designed to speed up your work progress. You can simply find all of your taxes
                  and clients in same place. With the help of auto fill you will fasten your progress.
                </p>
              </Container>
            </Col>

            <Col lg={6}>
              <Container >
                <h1 className={styles.gridhead} >Analytics</h1>
                <p className={styles.gridpara}>
                  With the detailed analytics that we provide for your company you can simply reach all the invoice and customer details with just a few clicks.
                  You will able to know how many product sold for a specific client, or you can find the estimation of the certain product in near future with the help of Machine learning.
                </p>
              </Container>
            </Col>

          </Row>
        </Container>


      </Container>

      <Container fluid className={styles.secondcontainer}>
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
