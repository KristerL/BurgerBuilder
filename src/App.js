import React from 'react';
import { Route } from "react-router-dom"

import Layout from "./hoc/Layout/Layout"
import BurgerBuilder from "./Containers/BurgerBuilder/BurgerBuilder"
import Checkout from "./Containers/Checkout/Checkout"


function App() {
    return (
        <div>
            <Layout>
                <Route path={"/checkout"} component={Checkout}/>
                <Route path={"/"} exact component={BurgerBuilder}/>
            </Layout>
        </div>
    );
}

export default App;
