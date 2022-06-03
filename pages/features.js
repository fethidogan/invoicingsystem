import Head from 'next/head'
import { Container, Button, Row, Col, Nav } from 'react-bootstrap'
import styles from "../styles/Home.module.css"
import Link from 'next/link'


export default function Features() {

  return (
    <>

      {/* Heading Section*/}
      <Container fluid className={styles.headingcontainer}>
        <Container>
          <h1 className={styles.headone} style={{ textAlign: "center" }}>Sell it. Do it. Analyze it.</h1>
          <p className={styles.headtwo} style={{ textAlign: "center", paddingLeft: "100px", paddingRight: "100px" }}>
            Set your business up for success with an end-to-end solution to manage your sales and customers, and keep track of your business results.
          </p>
        </Container>

        <Container className='d-flex justify-content-center'>
          <Link href="/contact"><Button className={styles.headingbutton} size='lg'>Try it for free</Button></Link>
        </Container>

      </Container>


      <Container fluid className={styles.thirdcontainer}>
        <Container >
          <h1 className={styles.secondhead} style={{ paddingTop: "100px" }}>Features</h1>
          <p className={styles.secondpara}>
            Add clients, expenses, sales persons these are some of our features in our software.
          </p>
        </Container>


        <Container className='mt-5'>
          <Row>
            <Col lg={6}>
              <Container >
                <h1 className={styles.gridhead} >Clients</h1>
                <ul>
                  <li>
                    <p className={styles.gridpara}>
                      Add remove your clients from your database and keep track of how much they spend in specific time range.
                    </p>
                  </li>
                  <li>
                    <p className={styles.gridpara}>
                      Autofill helps you to find your clients in short time in your database.
                    </p>
                  </li>
                </ul>
              </Container>
            </Col>

            <Col lg={6}>
              <Container >
                <h1 className={styles.gridhead} >Sales Person</h1>
                <ul>
                  <li>
                    <p className={styles.gridpara}>
                      Add your sales person and include their details in the invoices. Sounds cool isn't it.
                    </p>
                  </li>
                  <li>
                    <p className={styles.gridpara}>
                      Find the total sale or average sale of your sales person in specific time range.
                    </p>
                  </li>
                </ul>
              </Container>
            </Col>

          </Row>
        </Container>


        <Container className='mt-5'>
          <Row>
            <Col lg={6}>
              <Container >
                <h1 className={styles.gridhead} >Detailed Analytics</h1>
                <ul>
                  <li>
                    <p className={styles.gridpara}>
                      Find the detailed analytics of the invoices, expenses, sales persons and much more.
                    </p>
                  </li>
                  <li>
                    <p className={styles.gridpara}>
                      Find the total or average sale of a specific product.
                    </p>
                  </li>
                </ul>
              </Container>
            </Col>

            <Col lg={6}>
              <Container >
                <h1 className={styles.gridhead} >Machine Learning</h1>
                <ul>
                  <li>
                    <p className={styles.gridpara}>
                      Machine learning will help you to predict the sale price in the near future of a specific product.
                    </p>
                  </li>
                  <li>
                    <p className={styles.gridpara}>
                      With the help of machine learning your price decisions will be much more better.
                    </p>
                  </li>
                </ul>
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
