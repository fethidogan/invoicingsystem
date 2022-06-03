import { Container, Button, Row, Col, Form } from 'react-bootstrap'
import styles from "../../styles/App.module.css"
import Appnavbar from '../../components/appnavbar'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import axios from 'axios';
import { useRouter } from 'next/router';
import { checkIsUser } from '../../utils/functions'


export default function Clients() {
    const router = useRouter()
    var { searchname } = router.query ? router.query : ""
    var { sortby } = router.query
    const [salution, setSalution] = useState("Mr")
    const [fullname, setFullName] = useState("")
    const [company, setCompany] = useState("")
    const [mail, setMail] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")
    const [searchtext, setSearchtext] = useState("")
    const [sort, setSort] = useState("fullname")

    const [clients, setClients] = useState([])

    const [querypara, setQuerypara] = useState({ sortby: "fullname" })

    var userMail = Cookies.get("userMail")
    var userToken = Cookies.get("token")
    const token = Cookies.get("token")

    useEffect(() => {
        if (checkIsUser(userMail, userToken, "userclient") === "redirect") {
            router.push("/")
        } else {
            checkIsUser(userMail, userToken, "userclient")
                .then(data => setClients(data))
        }
    }, [])

    useEffect(async () => {
        if (searchname && sortby) {
            setSort(sortby)
            setSearchtext(searchname)
            setQuerypara({ ...querypara, sortby: sortby, searchname: searchname })
            await fetch('/api/clientquery?' + new URLSearchParams(router.query),
                {
                    method: 'get',
                    headers: new Headers({
                        'Authorization': 'Bearer ' + token
                    })
                })
                .then(res => { return res.json() })
                .then(data => setClients(data.message))
        }
    }, [searchname, sortby])


    // reset all fields
    const resetFields = () => {
        setSalution("Mr")
        setFullName("")
        setCompany("")
        setMail("")
        setPhone("")
        setAddress("")
    }

    // delete client
    const deleteClient = async (id) => {
        const { data } = await axios.post("/api/deleteclient", { id },
            {
                headers: { authorization: `Bearer ${token}` },
            }
        )
        const newclients = clients.filter(item => item._id !== id)
        setClients(newclients)
    }

    // add client
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post("/api/addclient", { salution, fullname, company, mail, phone, address },
                {
                    headers: { authorization: `Bearer ${token}` },
                }
            )
            setClients([...clients, { _id: data.message, salution: salution, fullname: fullname, company: company, mail: mail, phone: phone, address: address }])
            resetFields()
        } catch (err) {
            console.log(err)
        }
    }

    const handleSort = async () => {
        if (searchtext === "") {
            delete querypara.searchname
        }

        router.push({
            pathname: "/app/clients",
            query: querypara
        })

        await fetch('/api/clientquery?' + new URLSearchParams(querypara),
            {
                method: 'get',
                headers: new Headers({
                    'Authorization': 'Bearer ' + token
                })
            })
            .then(res => { return res.json() })
            .then(data => setClients(data.message))

    }

    const downloadCsv = async () => {

        await axios.get("/api/clientcsv",
            {
                headers: { authorization: `Bearer ${token}` }
            }
        ).then(response => {
            const { data } = response
            router.push(`/${data.url}`)
        })

    }

    return (
        <>

            {/* App Navbar */}
            <Appnavbar />

            <Container>
                <h2 className={styles.appaddproduct}>Add Client</h2>
                <hr />
            </Container>

            <Container className='mt-3 mb-3'>
                <Row>
                    <Col className={styles.appaddproductpara}>Salution</Col>
                    <Col className={styles.appaddproductpara}>Full Name</Col>
                    <Col className={styles.appaddproductpara}>Company Name</Col>
                    <Col className={styles.appaddproductpara}>Mail</Col>
                    <Col className={styles.appaddproductpara}>Phone</Col>

                </Row>
            </Container>

            <Form onSubmit={handleSubmit}>
                <Container>
                    <Row>
                        <Col className={styles.appaddproductpara}>
                            <Form.Select value={salution} onChange={(e) => setSalution(e.target.value)}>
                                <option value="Mr">Mr.</option>
                                <option value="Mrs">Mrs.</option>
                                <option value="Ms">Ms.</option>
                                <option value="Miss">Miss.</option>
                                <option value="Dr">Dr.</option>
                            </Form.Select>
                        </Col>
                        <Col className={styles.appaddproductpara}><Form.Control type="text" placeholder="Full Name" value={fullname} onChange={(e) => setFullName(e.target.value)} required /></Col>
                        <Col className={styles.appaddproductpara}><Form.Control type="text" placeholder="Company Name" value={company} onChange={(e) => setCompany(e.target.value)} required /></Col>
                        <Col className={styles.appaddproductpara}><Form.Control type="email" placeholder="Mail" value={mail} onChange={(e) => setMail(e.target.value)} required /></Col>
                        <Col className={styles.appaddproductpara}><Form.Control type="text" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} required /></Col>

                    </Row>
                    <p className={styles.appaddproductpara} style={{ marginTop: "15px" }}>Adress</p>
                    <Form.Control as="textarea" rows={2} placeholder="Adress" value={address} onChange={(e) => setAddress(e.target.value)} />

                    <Button className='mt-3' variant="primary" type="submit">Add Client</Button>
                </Container>
            </Form>



            <Container>
                <h2 className={styles.appaddproduct}>List of Clients</h2>
                <hr />
            </Container>

            <Container className='mt-3 mb-3'>
                <Row>
                    <Col className={styles.appaddproductpara}>
                        <p>Sort By</p>
                        <Form.Select
                            value={sort}
                            onChange={(e) => {
                                setQuerypara({ ...querypara, sortby: e.target.value })
                                setSort(e.target.value)
                            }}>

                            <option value="fullname">Full Name</option>
                            <option value="company">Company Name</option>
                        </Form.Select>
                    </Col>

                    <Col className={styles.appaddproductpara}>
                        <p>Search Client</p>
                        <Form.Control type="text" placeholder="Name"
                            value={searchtext}
                            onChange={(e) => {
                                setQuerypara({ ...querypara, searchname: e.target.value })
                                setSearchtext(e.target.value)
                            }} />
                    </Col>


                    <Col>
                        <Button style={{ marginTop: "40px" }} variant="primary" type="submit" onClick={() => handleSort()}>Filter</Button>
                    </Col>
                    <Col>
                        <Button style={{ marginTop: "40px" }} variant="primary" type="submit" onClick={() => downloadCsv()}>Download CSV</Button>
                    </Col>

                </Row>
            </Container>

            <Container className='mt-3 mb-3'>
                <Row>
                    <Col className={styles.appaddproductpara}>Salution</Col>
                    <Col className={styles.appaddproductpara}>Full Name</Col>
                    <Col className={styles.appaddproductpara}>Company Name</Col>
                    <Col className={styles.appaddproductpara}>Mail</Col>
                    <Col className={styles.appaddproductpara}>Phone</Col>
                    <Col className={styles.appaddproductpara}>Adress</Col>
                    <Col className={styles.appaddproductpara}></Col>
                </Row>
            </Container>

            {clients.map(item => {
                return (
                    <Container className='mt-3 mb-3' key={item._id}>
                        <Row>
                            <Col className={styles.appaddproductpara}>{item.salution}</Col>
                            <Col className={styles.appaddproductpara}>{item.fullname}</Col>
                            <Col className={styles.appaddproductpara}>{item.company}</Col>
                            <Col className={styles.appaddproductpara}>{item.mail}</Col>
                            <Col className={styles.appaddproductpara}>{item.phone}</Col>
                            <Col className={styles.appaddproductpara}>{item.address}</Col>
                            <Col><Button variant="danger" size='sm' type="submit" style={{ marginTop: "-15px" }} onClick={() => deleteClient(item._id)}>Delete Client</Button></Col>
                        </Row>
                    </Container>
                )
            })}

            {/* Bottom space for to fill bottom blanks */}
            <Container style={{ marginTop: "250px" }}></Container>
        </ >
    )
}

