import Head from 'next/head'
import { Container, Button, Row, Col, Nav, Navbar, Form, Card } from 'react-bootstrap'
import styles from "../../styles/App.module.css"
import { GiHamburgerMenu } from 'react-icons/gi'
import { Doughnut } from "react-chartjs-2";
import { ArcElement } from "chart.js";
import Chart from "chart.js/auto";
import Cookies from 'js-cookie'
import Link from 'next/link'
import Appnavbar from '../../components/appnavbar';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Analytics() {
    const token = Cookies.get("token")

    const [totalSale, setTotalSale] = useState(0)
    const [totalExpense, setTotalExpense] = useState(0)
    const [lastDate, setLastDate] = useState("last30")

    const [clients, setClients] = useState([])
    const [clientMatch, setClientMatch] = useState([])
    const [clientinput, setClientinput] = useState("")
    const [clientspend, setClientSpend] = useState()


    useEffect(() => {
        checkIsUser()
        fetchLast()
        fetchClients()
    }, [lastDate])


    // get all the clients
    const fetchClients = async () => {
        const { data } = await axios.get("/api/userclient",
            {
                headers: { authorization: `Bearer ${token}` },
            }
        )
        setClients(data.message)
    }

    const searchClient = (text) => {
        setClientinput(text)
        let matches = clients.filter((item) => item.fullname.includes(text))
        setClientMatch(matches)
        if (text === "") {
            setClientMatch([])
        }
    }


    const fetchLast = async () => {
        const { data } = await axios.post("/api/last30days", { lastDate },
            {
                headers: { authorization: `Bearer ${token}` },
            }
        )
        setTotalSale(Number(data.sales) - Number(data.expenses))
        setTotalExpense(data.expenses)
    }


    const handleClientSpend = async () => {
        const { data } = await axios.post("/api/clientspend", { clientinput },
            {
                headers: { authorization: `Bearer ${token}` },
            }
        )
        setClientSpend(data.sales)
    }


    const checkIsUser = () => {
        var userMail = Cookies.get("userMail")
        var userToken = Cookies.get("token")

        if (!userMail || !userToken) {
            router.push("/")
        }

    }

    const data = {
        labels: ["Total Sale", "Expenses"],
        datasets: [
            {
                data: [totalSale, totalExpense],
                backgroundColor: [
                    "rgb(242,165,152)",
                    "rgb(255,232,157)"
                ],
                hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"]
            }
        ],

        plugins: {
            labels: {
                render: "percentage",
                fontColor: ["green", "white"],
                precision: 2
            },
        },
        text: "23%",
    };

    return (
        <>
            {/* App Navbar */}
            <Appnavbar />

            <Container>
                <h2 className={styles.appaddproduct}>Summary</h2>
                <hr />
            </Container>

            <Form>
                <Container>
                    <Row>
                        <Col className={styles.appaddproductpara}></Col>
                        <Col className={styles.appaddproductpara}></Col>
                        <Col className={styles.appaddproductpara}></Col>
                        <Col className={styles.appaddproductpara}></Col>
                        <Col className={styles.appaddproductpara}>
                            <Form.Select aria-label="Default select example" onChange={(e) => setLastDate(e.target.value)}>
                                <option value="last30">Last 30 days</option>
                                <option value="last90">Last 90 days</option>
                            </Form.Select>
                        </Col>
                    </Row>
                </Container>
            </Form>

            <Container>
                <Row>
                    <Col style={{ maxWidth: "450px", maxHeight: "450px" }}>
                        <Doughnut
                            data={data}
                            options={{

                                elements: {

                                    center: {
                                        legend: { display: true, position: "right" },
                                        text: "Red is 2/3 the total numbers",
                                        color: "#FF6384", // Default is #000000
                                        fontStyle: "Arial", // Default is Arial
                                        sidePadding: 20, // Default is 20 (as a percentage)
                                        minFontSize: 20, // Default is 20 (in px), set to false and text will not wrap.
                                        lineHeight: 25 // Default is 25 (in px), used for when text wraps
                                    }
                                },

                            }}
                        />
                    </Col>
                    <Col className='d-flex justify-content-center align-items-center' style={{ marginLeft: "150px" }}>
                        <Container>
                            <h2 className={styles.analyticstitle}>Total Profit</h2>
                            <h3 className={styles.analyticstitlegreen}>$ {totalSale}</h3>
                            <h2 className={styles.analyticstitle}>Total Expenses</h2>
                            <h3 className={styles.analyticstitlegreen}>$ {totalExpense}</h3>
                        </Container>
                    </Col>
                </Row>
            </Container>

            <Container>
                <h2 className={styles.appaddproduct}>Sum of Clients Spend</h2>
                <hr />

                <Container className='mt-3 mb-3'>
                    <Row>

                        <Col className={styles.appaddproductpara}>
                            <span>Search Client</span>
                            <Form.Control type="text" placeholder="Name" value={clientinput} onChange={(e) => searchClient(e.target.value)} />
                            {clientMatch && clientMatch.map(item => {
                                return (
                                    <div key={item._id}>
                                        <Card >
                                            <Card.Body onClick={() => {
                                                setClientinput(item.fullname)
                                                setClientMatch([])
                                            }
                                            }>{item.fullname}</Card.Body>
                                        </Card>
                                    </div>
                                )
                            })}
                        </Col>

                        <Col>
                            <Button className='mt-4' variant="primary" onClick={() => handleClientSpend()}>Filter</Button>
                        </Col>

                    </Row>
                </Container>

                <Container className='mt-3 mb-3'>
                    <Row>
                        <Col className={styles.appaddproductpara}>Full Name</Col>
                        <Col className={styles.appaddproductpara}>Total Spend</Col>
                    </Row>
                </Container>

                <Container className='mt-3 mb-3'>
                    <Row>
                        <Col className={styles.appaddproductpara}>{clientinput}</Col>
                        <Col className={styles.appaddproductparagreen}>$ {clientspend}</Col>
                    </Row>
                </Container>
            </Container>

            {/* Bottom space for to fill bottom blanks */}
            <Container style={{ marginTop: "250px" }}></Container>
        </ >
    )
}
