import { useEffect, useState, useContext } from 'react'
import { Container, Button, Nav, Navbar } from 'react-bootstrap'
import styles from "../styles/App.module.css"
import { GiHamburgerMenu } from 'react-icons/gi'
import Link from 'next/link'
import { Store } from "../utils/store"

const Appnavbar = () => {
    const { state, dispatch } = useContext(Store);
    const { activeuser, company } = state

    return (
        <Container>
            <Navbar collapseOnSelect expand="lg" className={styles.appnavbar} style={{ marginTop: "100px" }}>

                <Container >
                    <Container>
                        <div className={styles.navbarwelcome}><img src="/images/logo1.png" width={80} height={50} style={{ marginRight: "5px", marginTop: "-5px" }} />{company}</div>
                    </Container>

                    <Navbar.Toggle aria-controls="responsive-navbar-nav">
                        <GiHamburgerMenu size={30} color="#2977ff" />
                    </Navbar.Toggle>

                    <Container>
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="me-auto"></Nav>
                            <Nav>
                                <Link href="/app/products" passHref><Nav.Link><span>Products</span></Nav.Link></Link>
                                <Link href="/app/clients" passHref><Nav.Link><span>Clients</span></Nav.Link></Link>
                                <Link href="/app/taxes" passHref><Nav.Link><span>Taxes</span></Nav.Link></Link>
                                <Link href="/app/salesman" passHref><Nav.Link><span>Salesman</span></Nav.Link></Link>
                                <Link href="/app/invoices" passHref><Nav.Link><span>Invoices</span></Nav.Link></Link>
                                <Link href="/app/expenses" passHref><Nav.Link><span>Expenses</span></Nav.Link></Link>
                                <Link href="/app/analytics" passHref><Nav.Link><span>Analytics</span></Nav.Link></Link>
                                <Link href="/app/settings" passHref><Nav.Link><span>Settings</span></Nav.Link></Link>
                                <Link href="/logout" passHref><Nav.Link><Button style={{ marginTop: "-4px" }} size='sm' variant='danger'>Logout</Button></Nav.Link></Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>

                </Container>
            </Navbar>

            <Container>
                <h2 className={styles.welcome}>Welcome {activeuser}</h2>
            </Container>

        </Container>
    )
}

export default Appnavbar