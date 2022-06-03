import React from 'react'
import { Container, Navbar, Nav, Button } from "react-bootstrap"
import { GiHamburgerMenu } from 'react-icons/gi'

// Menu css komple Home modul css içinde
import styles from '../styles/Home.module.css'
import Link from 'next/link'



const Menu = () => {

  return (
    <>
      <Navbar collapseOnSelect expand="lg" className={styles.navbar} fixed="top">

        <Container >
          <Link href="/" passHref><Navbar.Brand className={styles.bottlelogo}>Sellbill</Navbar.Brand></Link>

          <Navbar.Toggle aria-controls="responsive-navbar-nav">
            <GiHamburgerMenu size={30} color="#2977ff" />
          </Navbar.Toggle>

          <Container>
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto"></Nav>
              <Nav>

                <Link href="/features" passHref><Nav.Link><span className={styles.services}>Features</span></Nav.Link></Link>
                <Link href="/pricing" passHref><Nav.Link><span className={styles.services} style={{marginRight:"30px"}}>Pricing</span></Nav.Link></Link>
                <Link href="/login" passHref><Nav.Link><span className={styles.services}><Button className={styles.navbarhireus} size='md'>Login</Button></span></Nav.Link></Link>
                <Link href="/register" passHref><Nav.Link><span className={styles.services}><Button className={styles.navbarhireus} size='md' variant='success'>Register</Button></span></Nav.Link></Link>

              </Nav>
            </Navbar.Collapse>
          </Container>
        </Container>

      </Navbar>

    </>
  )
}

export default Menu
