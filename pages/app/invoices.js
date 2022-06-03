import { Container, Button, Row, Col, Form, Card } from 'react-bootstrap'
import styles from "../../styles/App.module.css"
import Appnavbar from '../../components/appnavbar'
import Cookies from 'js-cookie'
import { useEffect, useState, useContext } from 'react'
import axios from 'axios';
import { useRouter } from 'next/router';
import { Store } from '../../utils/store'
import { checkIsUser } from '../../utils/functions'

export default function Invoices() {
    const router = useRouter()
    const [client, setClient] = useState("")
    const [tempName, setTempName] = useState("")
    const [invoiceid, setInvoiceid] = useState("")
    const [invoiceDate, setInvoiceDate] = useState("")
    const [salesman, setSalesman] = useState("")
    const [product, setProduct] = useState([])
    const [shippingcost, setShippingCost] = useState(0)
    const [discount, setDiscount] = useState(0)
    const [quantity, setQuantity] = useState(1)
    const [total, setTotal] = useState(0)
    const [subtotal, setSubtotal] = useState(0)
    const [invoices, setInvoices] = useState([])
    const [userProducts, setUserProducts] = useState([])
    const [userClients, setUserClients] = useState([])
    const [userSalesman, setUserSalesman] = useState([])
    const [salesmanMatch, setsalesmanMatch] = useState([])
    const [productMatch, setProductMatch] = useState([])
    const [clientMatch, setClientMatch] = useState([])
    const [tempProducts, setTempProducts] = useState([])
    const [productinput, setproductinput] = useState("")
    const [clientinput, setClientinput] = useState("")
    const [salesmaninput, setSalesmaninput] = useState("")
    const token = Cookies.get("token")

    const { state, dispatch } = useContext(Store);
    const { activeuser } = state

    var userMail = Cookies.get("userMail")
    var userToken = Cookies.get("token")

    useEffect(() => {
        if (checkIsUser(userMail, userToken, "userinvoice") === "redirect") {
            router.push("/")
        } else {
            checkIsUser(userMail, userToken, "userinvoice")
                .then(data => { setInvoices(data) })
        }
        loadProducts()
        loadSalesmans()
        loadClients()
    }, [])


    const loadProducts = async () => {
        const { data } = await axios.get("/api/userproduct",
            {
                headers: { authorization: `Bearer ${token}` },
            }
        )
        setUserProducts(data.message)

    }

    const loadSalesmans = async () => {
        const { data } = await axios.get("/api/usersalesman",
            {
                headers: { authorization: `Bearer ${token}` },
            }
        )
        setUserSalesman(data.message)

    }

    const loadClients = async () => {
        const { data } = await axios.get("/api/userclient",
            {
                headers: { authorization: `Bearer ${token}` },
            }
        )
        setUserClients(data.message)
        console.log(data.message)
    }

    const searchProducts = (text) => {
        setproductinput(text)
        let matches = userProducts.filter((item) => item.name.includes(text))
        setProductMatch(matches)
        if (text === "") {
            setProductMatch([])
        }
    }

    const searchSalesman = (text) => {
        setSalesmaninput(text)
        let matches = userSalesman.filter((item) => item.name.includes(text))
        setsalesmanMatch(matches)
        if (text === "") {
            setsalesmanMatch([])
        }
    }

    const searchClient = (text) => {
        setClientinput(text)
        let matches = userClients.filter((item) => item.fullname.includes(text))
        console.log(matches)
        setClientMatch(matches)
        if (text === "") {
            setClientMatch([])
        }
    }

    const resetFields = () => {
        setClient("")
        setInvoiceid("")
        setInvoiceDate("")
        setSalesman("")
        setTempName("")
        setQuantity(1)
        setDiscount(0)
        setShippingCost(0)
        setSubtotal(0)
    }


    // delete invoices
    const deleteInvoices = async (id) => {
        const { data } = await axios.post("/api/deleteinvoice", { id },
            {
                headers: { authorization: `Bearer ${token}` },
            }
        )
        const newinvoices = invoices.filter(item => item._id !== id)
        setInvoices(newinvoices)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            const { data } = await axios.post("/api/addinvoice", { clientinput, invoiceid, invoiceDate, salesmaninput, product, discount, total },
                {
                    headers: { authorization: `Bearer ${token}` },
                }
            )
            setInvoices([...invoices, { _id: data.message, client: clientinput, invoiceid: invoiceid, invoiceDate: invoiceDate, salesman: salesmaninput, product: product, discount: discount, total: total }])
            setProduct([])
            resetFields()

        } catch (err) {
            console.log(err)
        }
    }

    const handleTempAdd = () => {
        tempProducts[tempProducts.length - 1].quantity = quantity
        tempProducts[tempProducts.length - 1].subtotal = tempProducts[tempProducts.length - 1].price * tempProducts[tempProducts.length - 1].quantity
        setProduct(tempProducts)
        setSubtotal(tempProducts.reduce((acc, curr) => { return acc + Number(curr.subtotal) }, 0))
        setTotal(tempProducts.reduce((acc, curr) => { return acc + Number(curr.subtotal) }, 0))
        setTempName("")
        setQuantity(1)
    }

    const handleDiscount = (e) => {
        var discountTotal = e.target.value
        var finalvalue = subtotal - ((subtotal * discountTotal) / 100)
        setTotal(finalvalue)
    }

    return (
        <>

            {/* App Navbar */}
            <Appnavbar />

            <Container>
                <h2 className={styles.appaddproduct}>Add Invoices</h2>
                <hr />
            </Container>

            <Form onSubmit={handleSubmit}>
                <Container className='mt-3 mb-3'>
                    <Row>
                        <Col className={styles.appaddproductpara}>Client</Col>
                        <Col className={styles.appaddproductpara}>Invoice #</Col>
                        <Col className={styles.appaddproductpara}>Invoice Date</Col>
                        <Col className={styles.appaddproductpara}>Salesman</Col>
                    </Row>
                </Container>

                <Container>
                    <Row>
                        <Col className={styles.appaddproductpara}>
                            <Form.Control type="text" placeholder="Client" value={clientinput} onChange={(e) => searchClient(e.target.value)} required />
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
                        <Col className={styles.appaddproductpara}><Form.Control type="text" placeholder="INV-001" onChange={(e) => setInvoiceid(e.target.value)} required /></Col>
                        <Col className={styles.appaddproductpara}><Form.Control type="date" onChange={(e) => setInvoiceDate(e.target.value)} required /></Col>
                        <Col className={styles.appaddproductpara}>
                            <Form.Control type="text" value={salesmaninput} onChange={(e) => searchSalesman(e.target.value)} required />
                            {salesmanMatch && salesmanMatch.map(item => {
                                return (
                                    <div key={item._id}>
                                        <Card >
                                            <Card.Body onClick={() => {
                                                setSalesmaninput(item.name)
                                                setsalesmanMatch([])
                                            }
                                            }>{item.name}</Card.Body>
                                        </Card>
                                    </div>
                                )
                            })}
                        </Col>
                    </Row>
                </Container>

                <Container className='mt-3 mb-3'>
                    <Row>
                        <Col className={styles.appaddproductpara}>Product</Col>
                        <Col className={styles.appaddproductpara}>Quantity</Col>
                        <Col className={styles.appaddproductpara}></Col>
                    </Row>
                </Container>

                <Container>
                    <Row>
                        <Col className={styles.appaddproductpara}>
                            <Form.Control type="text" placeholder="Product Name" value={productinput} onChange={(e) => searchProducts(e.target.value)} required />
                            {productMatch && productMatch.map(item => {
                                return (
                                    <div key={item._id}>
                                        <Card >
                                            <Card.Body onClick={() => {
                                                setproductinput(item.name)
                                                setProductMatch([])
                                                setTempProducts([...tempProducts, { _id: item._id, price: item.price, tax: item.tax, name: item.name }])
                                            }
                                            }>{item.name}</Card.Body>
                                        </Card>
                                    </div>
                                )
                            })}
                        </Col>
                        <Col className={styles.appaddproductpara}><Form.Control type="number" value={quantity} placeholder="1" onChange={(e) => setQuantity(e.target.value)} required /></Col>
                        <Col><Button variant="primary" onClick={() => handleTempAdd()}>Add Products</Button></Col>
                    </Row>
                </Container>

                <Container className='mt-3 mb-3'>
                    <Row>
                        <Col className={styles.appaddproductpara}>Product</Col>
                        <Col className={styles.appaddproductpara}>Quantity</Col>
                        <Col className={styles.appaddproductpara}>Price</Col>
                    </Row>
                </Container>

                {product.map(item => {
                    return (
                        <Container className='mt-3 mb-3' key={item._id}>
                            <Row>
                                <Col className={styles.appaddproductpara}>{item.name}</Col>
                                <Col className={styles.appaddproductpara}>{item.quantity}</Col>
                                <Col className={styles.appaddproductpara}>{item.price}</Col>
                            </Row>
                        </Container>
                    )
                })}

                <Container className='mt-3 mb-3'>
                    <Row>
                        <Col className={styles.appaddproductpara}></Col>
                        <Col className={styles.appaddproductpara}>
                            <Container>
                                <span>Sub Total</span>
                                <span style={{ marginLeft: "100px" }}>{subtotal} $</span>
                            </Container>

                            <Container className='d-flex mt-2'>
                                <span>Discount</span>
                                <span style={{ marginLeft: "100px", marginTop: "-5px" }}><Form.Control type="number" placeholder="10" size='sm' style={{ maxWidth: "150px" }} onChange={(e) => handleDiscount(e)} /></span>
                            </Container>

                            <hr />
                            <Container>
                                <span>Total</span>
                                <span style={{ marginLeft: "135px" }}>{total} $</span>
                            </Container>
                        </Col>
                    </Row>
                </Container>

                <Container>
                    <Button className='mt-3' variant="primary" type="submit" disabled={product.length ? false : true}>Add Invoice</Button>
                </Container>
            </Form>


            <Container>
                <h2 className={styles.appaddproduct}>List of Invoices</h2>
                <hr />
            </Container>

            <Container className='mt-3 mb-3'>
                <Row>
                    <Col className={styles.appaddproductpara}>Client</Col>
                    <Col className={styles.appaddproductpara}>Invoice #</Col>
                    <Col className={styles.appaddproductpara}>Invoice Date</Col>
                    <Col className={styles.appaddproductpara}>Salesman</Col>
                    <Col className={styles.appaddproductpara}>Total</Col>
                    <Col className={styles.appaddproductpara}></Col>
                </Row>
            </Container>

            {invoices.map(item => {
                return (
                    <Container className='mt-3 mb-3' key={item._id}>
                        <Row>
                            <Col className={styles.appaddproductpara}>{item.client}</Col>
                            <Col className={styles.appaddproductpara}>{item.invoiceid}</Col>
                            <Col className={styles.appaddproductpara}>{item.invoiceDate.slice(0, 10)}</Col>
                            <Col className={styles.appaddproductpara}>{item.salesman}</Col>
                            <Col className={styles.appaddproductpara}>{item.total} $</Col>
                            <Col><Button variant="danger" size='sm' type="submit" style={{ marginTop: "-15px" }} onClick={() => deleteInvoices(item._id)}>Delete Invoice</Button></Col>
                        </Row>
                    </Container>
                )
            })}

            {/* Bottom space for to fill bottom blanks */}
            <Container style={{ marginTop: "250px" }}></Container>
        </ >
    )
}
