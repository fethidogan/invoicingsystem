import Head from 'next/head'
import { Container, Button, Row, Col, Nav } from 'react-bootstrap'
import styles from "../../styles/Home.module.css"
import User from "../../models/user"
import dbConnect from '../../utils/db'
import Link from 'next/link'


export default function VerifyToken() {

    return (
        <>
            <Head>
                <title>VerifyToken</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <meta name="description" content="Web and mobile app development company, we are building app development and custom software development solutions with the expert developer team."></meta>

                <meta property="og:url" content="https://www.mindasoft.com" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="VerifyToken" />
                <meta property="og:description" content="Web and mobile app development company, we are building app development and custom software development solutions with the expert developer team." />
                <meta property="og:image" content="https://www.mindasoft.com/images/mindasoftlogo.png" />

                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="VerifyToken" />
                <meta name="twitter:description" content="Web and mobile app development company, we are building app development and custom software development solutions with the expert developer team." />
                <meta name="twitter:image" content="https://www.mindasoft.com/images/mindasoftlogo.png" />
                <link rel="canonical" href="https://www.mindasoft.com" />
            </Head>


            {/* Heading Section*/}
            <Container fluid className={styles.headingcontainer}>

                <Container>
                    <h1 className={styles.headone} style={{ textAlign: "center" }}>You are Activated</h1>
                    <p className={styles.headtwo} style={{ textAlign: "center", paddingLeft: "100px", paddingRight: "100px", paddingBottom: "200px" }}>
                        You can now use Sellbill freely. Click link below to go to login page
                    </p>
                </Container>
                <Container>
                    <Link href="http://localhost:3000/login" passHref><a>Login Page</a></Link>
                </Container>

            </Container>

        </ >


    )
}

export async function getServerSideProps({ params, res }) {
    await dbConnect();
    const { id } = params;
    const user = await User.findOne({ verifyToken: id }).lean()
    if (!user) {
        return {
            notFound: true
        }

    } else {
        await User.updateOne({ verifyToken: id }, { verified: true })
        const idstringed = { ...user, _id: user._id.toString() }
        return {
            props: {
                post: idstringed
            },
        };
    }
}
