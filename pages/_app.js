import "bootstrap/dist/css/bootstrap.css";
import { useEffect } from "react";
import { SSRProvider } from "react-bootstrap";
import Layout from "../layout/Layout";
import '../styles/globals.css'
import store from "../utils/store";
import { Provider } from 'react-redux';
import { StoreProvider } from "../utils/store"



function MyApp({ Component, pageProps }) {

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap")
  }, [])

  return (
    <>

      <StoreProvider store={store}>
        <SSRProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </SSRProvider>
      </StoreProvider>

    </>
  )
}

export default MyApp
