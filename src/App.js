import React from 'react';
import { Route } from "react-router-dom"

import Layout from "./hoc/Layout/Layout"
import BurgerBuilder from "./Containers/BurgerBuilder/BurgerBuilder"
import Checkout from "./Containers/Checkout/Checkout"
import Orders from "./Containers/Orders/Orders"
import Auth from "./Containers/Auth/Auth"
import Logout from "./Containers/Auth/Logout/Logout"

function App() {
    return (
        <div>
            <Layout>
                <Route path={"/checkout"} component={Checkout}/>
                <Route path={"/orders"} component={Orders}/>
                <Route path={"/auth"} component={Auth}/>
                <Route path={"/logout"} component={Logout}/>
                <Route path={"/"} exact component={BurgerBuilder}/>
            </Layout>
        </div>
    );
}

export default App;
