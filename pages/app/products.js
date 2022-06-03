import { Container, Button, Row, Col, Form, Card } from 'react-bootstrap'
import styles from "../../styles/App.module.css"
import Appnavbar from '../../components/appnavbar'
import Cookies from 'js-cookie'
import { useEffect, useState, useContext } from 'react'
import axios from 'axios';
import { useRouter } from 'next/router';
import { Store } from "../../utils/store"
import { checkIsUser } from '../../utils/functions'

export default function Products() {

    const router = useRouter()
    const [name, setName] = useState("")
    const [unit, setUnit] = useState("cm")
    const [tax, setTax] = useState("")
    const [currency, setCurrency] = useState("usd")
    const [price, setPrice] = useState(0)
    const [products, setProducts] = useState([])
    const [taxes, setTaxes] = useState([])
    const token = Cookies.get("token")

    const [sortbyinput, setSortbyinput] = useState("cheapfirst")
    const [findbycurrency, setFindbycurrency] = useState("usd")
    const [searchproduct, setSearchproduct] = useState("")
    const [pricerangemin, setPricerangemin] = useState(0)
    const [pricerangemax, setPricerangemax] = useState(60)

    const [querypara, setQuerypara] = useState({ sortby: "cheapfirst", currency: "usd", pricemin: 0, pricemax: 1000000 })

    const [taxinput, setTaxinput] = useState("")
    const [taxmatch, setTaxMatch] = useState([])

    const { state, dispatch } = useContext(Store);
    const { activeuser } = state

    useEffect(() => {
        if (checkIsUser(userMail, userToken, "usertax") === "redirect") {
            router.push("/")
        } else {
            checkIsUser(userMail, userToken, "usertax")
                .then(data => setTaxes(data))
        }
    }, [])


    const searchTaxes = (text) => {
        setTaxinput(text)
        let matches = taxes.filter((item) => item.name.includes(text))
        setTaxMatch(matches)
        if (text === "") {
            setTaxMatch([])
        }
    }


    const handleSort = async () => {
        console.log(querypara)
        if (searchproduct === "") {
            delete querypara.search
        }

        if (pricerangemin === "") {
            delete querypara.pricemin
        }

        if (pricerangemax === "") {
            delete querypara.pricemax
        }

        router.push({
            pathname: "/app/products",
            query: querypara
        })

        await fetch('/api/productquery?' + new URLSearchParams(querypara),
            {
                method: 'get',
                headers: new Headers({
                    'Authorization': 'Bearer ' + token
                })
            })
            .then(res => { return res.json() })
            .then(data => setProducts(data.message))

    }

    const resetFields = () => {
        setName("")
        setUnit("cm")
        setTax("")
        setCurrency("usd")
        setPrice("")
    }

    // get all the expenses
    const fetchProducts = async () => {
        const { data } = await axios.get("/api/userproduct",
            {
                headers: { authorization: `Bearer ${token}` },
            }
        )
        setProducts(data.message)
    }

    // delete expenses
    const deleteProduct = async (id) => {
        const { data } = await axios.post("/api/deleteproduct", { id },
            {
                headers: { authorization: `Bearer ${token}` },
            }
        )
        const newproducts = products.filter(item => item._id !== id)
        setProducts(newproducts)
    }

    // add expenses
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post("/api/addproduct", { name, unit, taxinput, currency, price },
                {
                    headers: { authorization: `Bearer ${token}` },
                }
            )
            setProducts([...products, { _id: data.message, name: name, unit: unit, tax: taxinput, currency: currency, price: price }])
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
                <h2 className={styles.appaddproduct}>Add Products </h2>
                <hr />
            </Container>

            <Container className='mt-3 mb-3'>
                <Row>
                    <Col className={styles.appaddproductpara}>Name</Col>
                    <Col className={styles.appaddproductpara}>Unit</Col>
                    <Col className={styles.appaddproductpara}>Tax</Col>
                    <Col className={styles.appaddproductpara}>Currency</Col>
                    <Col className={styles.appaddproductpara}>Price</Col>
                </Row>
            </Container>

            <Form onSubmit={handleSubmit}>
                <Container>
                    <Row>
                        <Col className={styles.appaddproductpara}><Form.Control type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required /></Col>
                        <Col className={styles.appaddproductpara}>
                            <Form.Select value={unit} onChange={(e) => setUnit(e.target.value)}>
                                <option value="cm">cm</option>
                                <option value="inch">inch</option>
                                <option value="pcs">pcs</option>
                                <option value="meter">meter</option>
                                <option value="service">service</option>
                            </Form.Select>
                        </Col>
                        <Col className={styles.appaddproductpara}>
                            <Form.Control type="text" placeholder="Tax" value={taxinput} onChange={(e) => searchTaxes(e.target.value)} required />
                            {taxmatch && taxmatch.map(item => {
                                return (
                                    <div key={item._id}>
                                        <Card >
                                            <Card.Body onClick={() => {
                                                setTaxinput(item.name)
                                                setTaxMatch([])
                                            }
                                            }>{item.name}</Card.Body>
                                        </Card>
                                    </div>
                                )
                            })}
                        </Col>
                        <Col className={styles.appaddproductpara}>
                            <Form.Select value={currency} onChange={(e) => setCurrency(e.target.value)}>
                                <option value="usd">$</option>
                                <option value="euro">€</option>
                                <option value="pound">£</option>
                            </Form.Select>
                        </Col>
                        <Col className={styles.appaddproductpara}><Form.Control type="number" placeholder="Price" step="0.1" value={price} onChange={(e) => setPrice(e.target.value)} required /></Col>
                    </Row>

                    <Button className='mt-3' variant="primary" type="submit">Add Product</Button>
                </Container>
            </Form>

            <Container>
                <h2 className={styles.appaddproduct}>List of Products</h2>
                <hr />
            </Container>

            <Container className='mt-3 mb-3'>
                <Row>
                    <Col className={styles.appaddproductpara}>
                        <p className='mb-3'>Sort By</p>
                        <Form.Select
                            value={sortbyinput}
                            onChange={(e) => {
                                setQuerypara({ ...querypara, sortby: e.target.value })
                                setSortbyinput(e.target.value)
                            }}>
                            <option value="cheapfirst">Cheap First</option>
                            <option value="expensivefirst">Expensive First</option>
                        </Form.Select>
                    </Col>
                    <Col className={styles.appaddproductpara}>
                        <p className='mb-3'>Find By Currency</p>
                        <Form.Select
                            value={findbycurrency}
                            onChange={(e) => {
                                setQuerypara({ ...querypara, currency: e.target.value })
                                setFindbycurrency(e.target.value)
                            }}>
                            <option value="usd">USD $</option>
                            <option value="pound">Pound £</option>
                            <option value="euro">Euro €</option>
                        </Form.Select>
                    </Col>

                    <Col className={styles.appaddproductpara}>
                        <p className='mb-3'>Search Product</p>
                        <Form.Control type="text" placeholder="Name"
                            value={searchproduct}
                            onChange={(e) => {
                                setQuerypara({ ...querypara, search: e.target.value })
                                setSearchproduct(e.target.value)
                            }}
                        />
                    </Col>

                    <Col>
                        <p className='mb-3'>Price Range</p>
                        <Container className='d-flex' style={{ marginLeft: "-25px" }}>
                            <Form.Control type="text" placeholder="0" style={{ maxWidth: "100px", marginRight: "25px" }}
                                value={pricerangemin}
                                onChange={(e) => {
                                    setQuerypara({ ...querypara, pricemin: e.target.value })
                                    setPricerangemin(e.target.value)
                                }}
                            />
                            <Form.Control type="text" placeholder="60" style={{ maxWidth: "100px" }}
                                value={pricerangemax}
                                onChange={(e) => {
                                    setQuerypara({ ...querypara, pricemax: e.target.value })
                                    setPricerangemax(e.target.value)
                                }}
                            />
                        </Container>
                    </Col>

                    <Col >
                        <Button style={{ marginTop: "42px" }} variant="primary" onClick={() => handleSort()}>Filter</Button>
                    </Col>

                </Row>
            </Container>

            <Container className='mt-3 mb-3'>
                <Row>
                    <Col className={styles.appaddproductpara}>Name</Col>
                    <Col className={styles.appaddproductpara}>Unit</Col>
                    <Col className={styles.appaddproductpara}>Tax</Col>
                    <Col className={styles.appaddproductpara}>Currency</Col>
                    <Col className={styles.appaddproductpara}>Price</Col>
                    <Col className={styles.appaddproductpara}></Col>
                </Row>
            </Container>

            {products.map(item => {
                return (
                    <Container className='mt-3 mb-3' key={item._id}>
                        <Row>
                            <Col className={styles.appaddproductpara}>{item.name}</Col>
                            <Col className={styles.appaddproductpara}>{item.unit}</Col>
                            <Col className={styles.appaddproductpara}>{item.tax}</Col>
                            <Col className={styles.appaddproductpara}>{item.currency}</Col>
                            <Col className={styles.appaddproductpara}>{item.price}</Col>
                            <Col><Button variant="danger" size='sm' type="submit" style={{ marginTop: "-15px" }} onClick={() => deleteProduct(item._id)}>Delete Product</Button></Col>
                        </Row>
                    </Container>
                )
            })}


            {/* Bottom space for to fill bottom blanks */}
            <Container style={{ marginTop: "250px" }}></Container>
        </ >
    )
}
