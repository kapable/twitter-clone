import PropTypes from 'prop-types';
import 'antd/dist/antd.css'
import Head from 'next/head'
import React from "react" 
import wrapper from '../store/configureStore'
React.useLayoutEffect = React.useEffect 

const App =({ Component }) => {
    return (
        <>
            <Head>
                <meta charSet="utf-8"/>
                <title>SEND BIRD</title>
                <link rel='shortcut icon' href="/favicon.png"/>
            </Head>
            <Component />
        </>
    )
};

App.propTypes = {
    Component: PropTypes.elementType.isRequired,
}

export default wrapper.withRedux(App);