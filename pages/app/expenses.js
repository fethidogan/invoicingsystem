import { Container, Button, Row, Col, Form } from 'react-bootstrap'
import styles from "../../styles/App.module.css"
import Appnavbar from '../../components/appnavbar'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import axios from 'axios';
import { useRouter } from 'next/router';
import { checkIsUser, fetchData } from '../../utils/functions'


export default function Clients() {
    const router = useRouter()
    const [name, setName] = useState("")
    const [total, setTotal] = useState(1)
    const [details, setDetails] = useState("")
    const [date, setDate] = useState("")
    const [sortby, setSortby] = useState("ascending")
    const [searchquery, setSearchquery] = useState("")
    const [expenses, setExpenses] = useState([])
    const [tempexpenses, setTempExpenses] = useState(expenses)

    const token = Cookies.get("token")
    var userMail = Cookies.get("userMail")
    var userToken = Cookies.get("token")

    useEffect(() => {
        if (checkIsUser(userMail, userToken, "userexpense") === "redirect") {
            router.push("/")
        } else {
            checkIsUser(userMail, userToken, "userexpense")
                .then(data => {
                    setExpenses(data)
                    setTempExpenses(data)
                })
        }
    }, [])



    // reset all fields
    const resetFields = () => {
        setName("")
        setTotal(1)
        setDetails("")
    }


    // delete expenses
    const deleteExpenses = async (id) => {
        const { data } = await axios.post("/api/deleteexpense", { id },
            {
                headers: { authorization: `Bearer ${token}` },
            }
        )
        const newsalesman = expenses.filter(item => item._id !== id)
        setTempExpenses(newsalesman)
    }

    // add expenses
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post("/api/addexpense", { name, total, date, details },
                {
                    headers: { authorization: `Bearer ${token}` },
                }
            )
            setTempExpenses([...expenses, { _id: data.message, name: name, total: total, date: date, details: details }])
            resetFields()
        } catch (err) {
            console.log(err)
        }
    }

    const handleSort = async () => {
        if (searchquery === "") {
            setTempExpenses(expenses)
        }
        const newarr = expenses.filter(item => item.name.includes(searchquery))

        if (sortby === "ascending") {
            return setTempExpenses(newarr.sort((a, b) => { return a.total - b.total }))
        }
        if (sortby === "descending") {
            return setTempExpenses(newarr.sort((a, b) => { return b.total - a.total }))
        }
    }

    return (
        <>

            <Appnavbar />

            <Container>
                <h2 className={styles.appaddproduct}>Add Expense</h2>
                <hr />
            </Container>

            <Container className='mt-3 mb-3'>
                <Row>

                    <Col className={styles.appaddproductpara}>Expense Name</Col>
                    <Col className={styles.appaddproductpara}>Expense Total</Col>
                    <Col className={styles.appaddproductpara}>Expense Date</Col>
                </Row>
            </Container>

            <Form onSubmit={handleSubmit}>
                <Container>
                    <Row>
                        <Col className={styles.appaddproductpara}><Form.Control type="text" placeholder="Expense Name" value={name} onChange={(e) => setName(e.target.value)} required /></Col>
                        <Col className={styles.appaddproductpara}><Form.Control type="number" placeholder="Expense Total" value={total} onChange={(e) => setTotal(e.target.value)} min="1" required /></Col>
                        <Col className={styles.appaddproductpara}><Form.Control type="date" value={date} onChange={(e) => setDate(e.target.value)} required /></Col>
                    </Row>
                    <span className={styles.appaddproductpara}>Expense Details</span>
                    <Form.Control type="text" placeholder="Details (Optional)" value={details} onChange={(e) => setDetails(e.target.value)} required />

                    <Button className='mt-3' variant="primary" type="submit">Add Expense</Button>
                </Container>
            </Form>



            <Container>
                <h2 className={styles.appaddproduct}>List of Expenses</h2>
                <hr />
            </Container>

            <Container className='mt-3 mb-3'>
                <Row>
                    <Col className={styles.appaddproductpara}>
                        <p>Sort By Price</p>
                        <Form.Select onChange={(e) => setSortby(e.target.value)}>
                            <option value="ascending">Ascending</option>
                            <option value="descending">Descending</option>
                        </Form.Select>
                    </Col>

                    <Col className={styles.appaddproductpara}>
                        <p>Search Expense</p>
                        <Form.Control type="text" placeholder="Name" onChange={(e) => setSearchquery(e.target.value)} />
                    </Col>

                    <Col>
                        <Button style={{ marginTop: "40px" }} variant="primary" onClick={() => handleSort()}>Filter</Button>
                    </Col>

                </Row>
            </Container>

            <Container className='mt-3 mb-3'>
                <Row>
                    <Col className={styles.appaddproductpara}>Expense Name</Col>
                    <Col className={styles.appaddproductpara}>Expense Total (USD)</Col>
                    <Col className={styles.appaddproductpara}>Details</Col>
                    <Col className={styles.appaddproductpara}></Col>
                </Row>
            </Container>

            {tempexpenses.map(item => {
                return (
                    <Container className='mt-3 mb-3' key={item._id}>
                        <Row>
                            <Col className={styles.appaddproductpara}>{item.name}</Col>
                            <Col className={styles.appaddproductpara}>{item.total}</Col>
                            <Col className={styles.appaddproductpara}>{item.details}</Col>
                            <Col><Button variant="danger" size='sm' type="submit" style={{ marginTop: "-15px" }} onClick={() => deleteExpenses(item._id)}>Delete Salesman</Button></Col>
                        </Row>
                    </Container>
                )
            })}

            {/* Bottom space for to fill bottom blanks */}
            <Container style={{ marginTop: "250px" }}></Container>
        </ >
    )
}
