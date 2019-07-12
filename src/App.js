import React, {Component} from 'react';
import {Route, Redirect} from "react-router-dom"

import Layout from "./hoc/Layout/Layout"
import BurgerBuilder from "./Containers/BurgerBuilder/BurgerBuilder"
import Checkout from "./Containers/Checkout/Checkout"
import Auth from "./Containers/Auth/Auth"
import Logout from "./Containers/Auth/Logout/Logout"
import * as actions from "./store/actions/index"
import {connect} from "react-redux";
import asyncComponent from "./hoc/asyncComponent/asyncComponent"

const asyncCheckout = asyncComponent(() =>{
    return import("./Containers/Checkout/Checkout")
});

const asyncOrder = asyncComponent(() =>{
    return import("./Containers/Orders/Orders")
});

const asyncAuth = asyncComponent(() =>{
    return import("./Containers/Auth/Auth")
});

class App extends Component {
    componentDidMount() {
        this.props.onTryAutoSignup();
    }

    render() {

        let routes = (
            <div>
                <Route path={"/auth"} component={asyncAuth}/>
                <Route path={"/"} exact component={BurgerBuilder}/>
                <Redirect to={"/"}/>
            </div>
        );

        if (this.props.isAuthenticated) {
            routes = (
                <div>
                    <Route path={"/checkout"} component={asyncCheckout}/>
                    <Route path={"/orders"} component={asyncOrder}/>
                    <Route path={"/logout"} component={Logout}/>
                    <Route path={"/auth"} component={asyncAuth}/>
                    <Route path={"/"} exact component={BurgerBuilder}/>
                    <Redirect to={"/"}/>
                </div>
            );
        }
        return (
            <div>
                <Layout>
                    {routes}
                </Layout>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
}
};

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignup: () => dispatch(actions.authCheckState())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
