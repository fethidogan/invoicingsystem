import { Container, Button, Row, Col, Form } from 'react-bootstrap'
import styles from "../../styles/App.module.css"
import Appnavbar from '../../components/appnavbar'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import axios from 'axios';
import { useRouter } from 'next/router';
import { checkIsUser } from '../../utils/functions'


export default function Salesman() {
    const router = useRouter()
    const [name, setName] = useState("")
    const [mail, setMail] = useState("")
    const [phone, setPhone] = useState("")
    const [searchquery, setSearchquery] = useState("")
    const [salesmans, setSalesmans] = useState([])
    const [tempsalesmans, setTempsalesmans] = useState(salesmans)
    
    const token = Cookies.get("token")
    var userMail = Cookies.get("userMail")
    var userToken = Cookies.get("token")

    useEffect(() => {
        if (checkIsUser(userMail, userToken, "usersalesman") === "redirect") {
            router.push("/")
        } else {
            checkIsUser(userMail, userToken, "usersalesman")
                .then(data => {
                    setSalesmans(data)
                    setTempsalesmans(data)
                })
        }
    }, [])


    const resetFields = () => {
        setName("")
        setMail("")
        setPhone("")
    }

    // delete salesmans
    const deleteSalesman = async (id) => {
        const { data } = await axios.post("/api/deletesalesman", { id },
            {
                headers: { authorization: `Bearer ${token}` },
            }
        )
        const newsalesman = salesmans.filter(item => item._id !== id)
        setTempsalesmans(newsalesman)
    }

    // add salesmans
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post("/api/addsalesman", { name, mail, phone },
                {
                    headers: { authorization: `Bearer ${token}` },
                }
            )
            setTempsalesmans([...salesmans, { _id: data.message, name: name, mail: mail, phone: phone }])
            resetFields()
        } catch (err) {
            console.log(err)
        }
    }

    const handleSort = async () => {
        if (searchquery === ""){
            setTempsalesmans(salesmans)
        }
        setTempsalesmans(salesmans.filter(item => item.name.includes(searchquery)))
    }

    return (

        <>
            {/* App Navbar */}
            <Appnavbar />

            <Container>
                <h2 className={styles.appaddproduct}>Add Salesman</h2>
                <hr />
            </Container>

            <Container className='mt-3 mb-3'>
                <Row>
                    <Col className={styles.appaddproductpara}>Name</Col>
                    <Col className={styles.appaddproductpara}>Mail</Col>
                    <Col className={styles.appaddproductpara}>Phone</Col>
                </Row>
            </Container>

            <Form onSubmit={handleSubmit}>
                <Container>
                    <Row>
                        <Col className={styles.appaddproductpara}><Form.Control type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required /></Col>
                        <Col className={styles.appaddproductpara}><Form.Control type="email" placeholder="Mail" value={mail} onChange={(e) => setMail(e.target.value)} required /></Col>
                        <Col className={styles.appaddproductpara}><Form.Control type="text" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} required /></Col>
                    </Row>

                    <Button className='mt-3' variant="primary" type="submit">Add Salesman</Button>
                </Container>
            </Form>



            <Container>
                <h2 className={styles.appaddproduct}>List of Salesman</h2>
                <hr />
            </Container>

            <Container className='mt-3 mb-3'>
                <Row>
                    <Col className={styles.appaddproductpara}>
                        <p>Search Salesman</p>
                        <Form.Control type="text" placeholder="Name" value={searchquery} onChange={(e) => setSearchquery(e.target.value)} />
                    </Col>

                    <Col>
                        <Button style={{ marginTop: "40px" }} variant="primary" onClick={() => handleSort()}>Filter</Button>
                    </Col>

                </Row>
            </Container>

            <Container className='mt-3 mb-3'>
                <Row>
                    <Col className={styles.appaddproductpara}>Name</Col>
                    <Col className={styles.appaddproductpara}>Mail</Col>
                    <Col className={styles.appaddproductpara}>Phone</Col>
                    <Col className={styles.appaddproductpara}></Col>
                </Row>
            </Container>

            {tempsalesmans.map(item => {
                return (
                    <Container className='mt-3 mb-3' key={item._id}>
                        <Row>
                            <Col className={styles.appaddproductpara}>{item.name}</Col>
                            <Col className={styles.appaddproductpara}>{item.mail}</Col>
                            <Col className={styles.appaddproductpara}>{item.phone}</Col>
                            <Col><Button variant="danger" size='sm' type="submit" style={{ marginTop: "-15px" }} onClick={() => deleteSalesman(item._id)}>Delete Salesman</Button></Col>
                        </Row>
                    </Container>
                )
            })}


            {/* Bottom space for to fill bottom blanks */}
            <Container style={{ marginTop: "250px" }}></Container>
        </ >
    )
}
