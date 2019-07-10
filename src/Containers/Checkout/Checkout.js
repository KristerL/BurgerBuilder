import React, {Component} from "react";
import {Route} from "react-router-dom";

import CheckoutSummary from "../../Components/CheckoutSummary/CheckoutSummary"
import ContactData from "../Checkout/ContactData/ContactData"
import * as actionTypes from "../../store/actions/actionTypes";
import {connect} from "react-redux";

class Checkout extends Component{

    checkoutCancelledHandler = () =>{
        this.props.history.goBack();
    };

    checkoutContinueHandler = () =>{
        this.props.history.replace("/checkout/contact-data");
    };

    render(){
        return(
            <div>
                <CheckoutSummary ingredients={this.props.ings}
                checkoutCancelled={this.checkoutCancelledHandler}
                                 checkoutContinue={this.checkoutContinueHandler}
                />
                <Route
                    path={this.props.match.path + "/contact-data"}
                    component={ContactData}/>
            </div>
        )
    }
}

const mapStateToProps = state =>{
    return{
        ings: state.ingredients,

    }
};

export default connect(mapStateToProps)(Checkout);