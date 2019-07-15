import React, {useEffect, Suspense} from 'react';
import {Route, Redirect} from "react-router-dom"

import Layout from "./hoc/Layout/Layout"
import BurgerBuilder from "./Containers/BurgerBuilder/BurgerBuilder"
import Logout from "./Containers/Auth/Logout/Logout"
import * as actions from "./store/actions/index"
import {connect} from "react-redux";

const Checkout = React.lazy(() => {
    return import("./Containers/Checkout/Checkout")
});

const Orders = React.lazy(() => {
    return import("./Containers/Orders/Orders")
});

const Auth = React.lazy(() => {
    return import("./Containers/Auth/Auth")
});

const app = props => {

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        props.onTryAutoSignup();
    }, []);


    let routes = (
        <div>
            <Route path={"/auth"} render={(props) => <Auth {...props}/>}/>
            <Route path={"/"} exact component={BurgerBuilder}/>
            <Redirect to={"/"}/>
        </div>
    );

    if (props.isAuthenticated) {
        routes = (
            <div>
                <Route path={"/checkout"} render={(props) => <Checkout {...props}/>}/>
                <Route path={"/orders"} render={(props) => <Orders {...props}/>}/>
                <Route path={"/logout"} component={Logout}/>
                <Route path={"/auth"} render={(props) => <Auth {...props} />}/>
                <Route path={"/"} exact component={BurgerBuilder}/>
                <Redirect to={"/"}/>
            </div>
        );
    }

    return (
        <div>
            <Layout>
                <Suspense fallback={<p>...Loading</p>}>{routes}</Suspense>
            </Layout>
        </div>
    );

};

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

export default connect(mapStateToProps, mapDispatchToProps)(app);
