import Head from 'next/head'
import { Container, Button, Row, Col, Nav, Navbar, Form } from 'react-bootstrap'
import styles from "../../styles/App.module.css"
import { GiHamburgerMenu } from 'react-icons/gi'
import Link from 'next/link'
import Appnavbar from '../../components/appnavbar'
import { useEffect, useContext, useState } from 'react'
import Cookies from 'js-cookie'
import { Store } from "../../utils/store"
import { useRouter } from "next/router"
import axios from 'axios'


export default function Settings() {
    const router = useRouter()
    const { state, dispatch } = useContext(Store);
    const { activeuser, company } = state

    var token = Cookies.get("token")
    const [companyName, setCompanyName] = useState("")
    const [loggedUser, setLoggedUser] = useState("")
    const [location, setLocation] = useState("")

    useEffect(() => {
        checkIsUser()
    }, [])

    const checkIsUser = () => {
        var userMail = Cookies.get("userMail")
        var userToken = Cookies.get("token")
        var company = Cookies.get("company")
        var location = Cookies.get("location")

        setCompanyName(company)
        setLoggedUser(userMail)
        setLocation(location)

        if (!userMail || !userToken) {
            router.push("/")
        }
    }

    const handleSubmitCompany = async (e) => {
        e.preventDefault();
        try {

            const { data } = await axios.post("/api/updatecompanyinfo", { companyName, location },
                {
                    headers: { authorization: `Bearer ${token}` },
                }
            )
            
            Cookies.set('company', data.message.company, { expires: 5 })
            dispatch({ type: "LOGGED_COMPANY", payload: data.message.company })
            setCompanyName(data.message.company)

            dispatch({ type: "COMPANY_LOCATION", payload: data.message.location })
            Cookies.set('location', data.message.location, { expires: 5 })
            setLocation(data.message.location)

        } catch (err) {
            console.log(err)
        }
    }


    return (
        <>

            {/* App Navbar */}
            <Appnavbar />

            <Container className='mt-5'>
                <h2 className={styles.appaddproduct}>Company Settings</h2>
                <hr />
            </Container>

            <Container>
                <Form onSubmit={handleSubmitCompany}>
                    <Row>
                        <Col>
                            <img src="/images/logo1.png" width={154} height={90} style={{ marginRight: "5px", marginTop: "-5px" }} />
                            <Form.Group controlId="formFile" className="mb-3">
                                <Form.Label className={styles.appaddproductpara}>Change picture</Form.Label>
                                <Form.Control type="file" />
                            </Form.Group>
                        </Col>

                        <Col>
                            <Container>
                                <p className={styles.appaddproductpara}>Company Name</p>
                                <Form.Control type="text" placeholder={companyName} onChange={(e) => setCompanyName(e.target.value)} />
                            </Container>

                            <Container className='mt-3'>
                                <p className={styles.appaddproductpara}>Company Location</p>
                                <Form.Control type="text" placeholder={location} onChange={(e) => setLocation(e.target.value)} />
                            </Container>
                        </Col>

                        <Container>
                            <Button className='mt-3' variant="success" type="submit">Save Company Settings</Button>
                        </Container>
                    </Row>
                </Form>
            </Container>

            <Container className='mt-5'>
                <h2 className={styles.appaddproduct}>Settings</h2>
                <hr />
            </Container>

            <Container>
                <Form>
                    <Row>

                        <Col>
                            <Container>
                                <p className={styles.appaddproductpara}>Change Password</p>
                                <Form.Control type="password" placeholder="Old Password" />
                            </Container>

                            <Container className='mt-3'>
                                <Form.Control type="password" placeholder="New Password" />
                            </Container>

                            <Container className='mt-3'>
                                <Form.Control type="password" placeholder="Confirm New Password" />
                            </Container>
                        </Col>

                        <Col>
                            <Container>
                                <p className={styles.appaddproductpara}>Change Mail</p>
                                <Form.Control type="mail" placeholder={loggedUser} onChange={(e) => setLoggedUser(e.target.value)} />
                            </Container>
                        </Col>

                        <Container>
                            <Button className='mt-4' variant="success" type="submit">Save Settings</Button>
                        </Container>

                    </Row>
                </Form>
            </Container>

            {/* Bottom space for to fill bottom blanks */}
            <Container style={{ marginTop: "250px" }}></Container>
        </ >
    )
}
