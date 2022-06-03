import { Container, Button, Row, Col, Form } from 'react-bootstrap'
import styles from "../../styles/App.module.css"
import Appnavbar from '../../components/appnavbar'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import axios from 'axios';
import { useRouter } from 'next/router';
import { checkIsUser } from '../../utils/functions'

export default function Taxes() {
    const router = useRouter()
    var { sort } = router.query
    const [taxname, setTaxName] = useState("")
    const [taxpercentage, setTaxPercentage] = useState(0)
    const [taxes, setTaxes] = useState([])
    const [sortinput, setSortinput] = useState("name")

    const token = Cookies.get("token")
    var userMail = Cookies.get("userMail")
    var userToken = Cookies.get("token")

    // First render
    useEffect(() => {
        if (checkIsUser(userMail, userToken, "usertax") === "redirect") {
            router.push("/")
        } else {
            checkIsUser(userMail, userToken, "usertax")
                .then(data => setTaxes(data))
        }
    }, [])

    useEffect(async () => {
        if (sort) {
            setSortinput(sort)
            await fetch('/api/getsorted?' + new URLSearchParams(router.query),
                {
                    method: 'get',
                    headers: new Headers({
                        'Authorization': 'Bearer ' + token
                    })
                })
                .then(res => { return res.json() })
                .then(data => setTaxes(data.message))
        }
    }, [sort])

    const resetFields = () => {
        setTaxName("")
        setTaxPercentage(0)
    }

    // handleSort
    const handleSort = async () => {
        router.push({
            pathname: "/app/taxes",
            query: {
                sort: sortinput
            }
        })

        await fetch('/api/getsorted?' + new URLSearchParams({ sort: sortinput }),
            {
                method: 'get',
                headers: new Headers({
                    'Authorization': 'Bearer ' + token
                })
            })
            .then(res => { return res.json() })
            .then(data => setTaxes(data.message))
    }


    // delete the tax and refresh the list
    const deleteTax = async (id) => {
        const { data } = await axios.post("/api/deletetax", { id },
            {
                headers: { authorization: `Bearer ${token}` },
            }
        )
        const newtax = taxes.filter(item => item._id !== id)
        setTaxes(newtax)

    }

    // fetch taxes at first render
    const fetchTaxes = async () => {
        const { data } = await axios.get("/api/usertax",
            {
                headers: { authorization: `Bearer ${token}` },
            }
        )
        setTaxes(data.message)
    }

    // add new tax to taxes database
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post("/api/addtax", { taxname, taxpercentage },
                {
                    headers: { authorization: `Bearer ${token}` },
                }
            )
            setTaxes([...taxes, { _id: data.message, name: taxname, percentage: taxpercentage }])
            resetFields()
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            {/* App Navbar */}
            <Appnavbar />

            <Container>
                <h2 className={styles.appaddproduct}>Add Tax</h2>
                <hr />
            </Container>

            <Container className='mt-3 mb-3'>
                <Row>

                    <Col className={styles.appaddproductpara}>Tax Name</Col>
                    <Col className={styles.appaddproductpara}>Tax Percentage</Col>
                </Row>
            </Container>

            <Form onSubmit={handleSubmit}>
                <Container>
                    <Row>
                        <Col className={styles.appaddproductpara}><Form.Control type="text" placeholder="Tax Name" value={taxname} onChange={(e) => setTaxName(e.target.value)} required /></Col>
                        <Col className={styles.appaddproductpara}><Form.Control type="number" placeholder="Tax Percentage" value={taxpercentage} onChange={(e) => setTaxPercentage(e.target.value)} required /></Col>
                    </Row>
                    <Button className='mt-3' variant="primary" type="submit">Add Tax</Button>
                </Container>
            </Form>

            <Container>
                <h2 className={styles.appaddproduct}>List of Taxes</h2>
                <hr />
            </Container>

            <Container className='mt-3 mb-3'>
                <Row>
                    <Col className={styles.appaddproductpara}>
                        <p>Sort By</p>
                        <Form.Select aria-label="Default select example" style={{ maxWidth: "250px" }} value={sortinput} onChange={(e) => setSortinput(e.target.value)}>
                            <option value="name">Tax Name</option>
                            <option value="percentage">Tax Percentage</option>
                        </Form.Select>
                    </Col>

                    <Col>
                        <Button style={{ marginTop: "40px" }} variant="primary" type="submit" onClick={() => handleSort()}>Filter</Button>
                    </Col>

                </Row>
            </Container>

            <Container className='mt-3 mb-3'>
                <Row>
                    <Col className={styles.appaddproductpara}>Tax Name</Col>
                    <Col className={styles.appaddproductpara}>Tax Percentage</Col>
                    <Col className={styles.appaddproductpara}></Col>

                </Row>
            </Container>

            {taxes.map(item => {
                return (
                    <Container className='mt-3 mb-3' key={item._id}>
                        <Row>
                            <Col className={styles.appaddproductpara}>{item.name}</Col>
                            <Col className={styles.appaddproductpara}>{item.percentage}</Col>
                            <Col><Button variant="danger" size='sm' type="submit" style={{ marginTop: "-15px" }} onClick={() => deleteTax(item._id)}>Delete Tax</Button></Col>
                        </Row>
                    </Container>
                )
            })}

            {/* Bottom space for to fill bottom blanks */}
            <Container style={{ marginTop: "250px" }}></Container>
        </ >
    )
}
