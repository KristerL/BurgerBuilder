import React, {Component} from 'react';
import {Route, Redirect} from "react-router-dom"

import Layout from "./hoc/Layout/Layout"
import BurgerBuilder from "./Containers/BurgerBuilder/BurgerBuilder"
import Checkout from "./Containers/Checkout/Checkout"
import Orders from "./Containers/Orders/Orders"
import Auth from "./Containers/Auth/Auth"
import Logout from "./Containers/Auth/Logout/Logout"
import * as actions from "./store/actions/index"
import {connect} from "react-redux";

class App extends Component {
    componentDidMount() {
        this.props.onTryAutoSignup();
    }

    render() {

        let routes = (
            <div>
                <Route path={"/auth"} component={Auth}/>
                <Route path={"/"} exact component={BurgerBuilder}/>
                <Redirect to={"/"}/>
            </div>
        );

        if (this.props.isAuthenticated) {
            routes = (
                <div>
                    <Route path={"/checkout"} component={Checkout}/>
                    <Route path={"/orders"} component={Orders}/>
                    <Route path={"/logout"} component={Logout}/>
                    <Route path={"/auth"} component={Auth}/>
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
