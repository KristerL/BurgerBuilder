import React, {useState} from "react";

import Button from "../../../Components/UI/Button/Button"
import classes from "../ContactData/ContactData.css"
import axios from "../../../axios-orders"
import Spinner from "../../../Components/UI/Spinner/Spinner"
import Input from "../../../Components/UI/Input/Input"
import {connect} from "react-redux";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler"
import * as actions from "../../../store/actions/index"


const contactData = props => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [orderForm, setOrderForm] = useState( {
            name: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Your name"
                },
                value: "",
                validation:{
                    required:true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "street"
                },
                value: "",
                validation:{
                    required:true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "ZIP Code"
                },
                value: "",
                validation:{
                    required:true,
                    minLength: 5,
                    maxLength: 5,
                    isNumeric: true
                },
                valid: false,
                touched: false,
            },
            country: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Country"
                },
                value: "",
                validation:{
                    required:true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: "input",
                elementConfig: {
                    type: "email",
                    placeholder: "Your E-Mail"
                },
                value: "",
                validation:{
                    required:true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: "select",
                elementConfig: {
                    options: [
                        {value: "fastest", displayValue: "fastest"},
                        {value: "cheapest", displayValue: "cheapest"}

                    ]
                },
                value: "fastest",
                validation: {},
                valid:true
            }
        });

    // eslint-disable-next-line react-hooks/rules-of-hooks
        const [formIsValid, setFormIsValid] = useState(false);


    const orderHandler = (event) => {
        event.preventDefault();
        const formData = {};

        for(let formElementIdentifier in orderForm){
            formData[formElementIdentifier] = orderForm[formElementIdentifier].value;
        }

        const order = {
            ingredients: props.ings,
            price: props.price,
            orderData: formData,
            userId: props.userId
        };

        props.onOrderBurger(order, props.token);

    };

    const checkValidity = (value, rules) => {
        let isValid = true;

        if(rules.required){
            isValid = value.trim() !== "" && isValid;
        }

        if(rules.minLength){
            isValid = value.length >= rules.minLength && isValid;
        }

        if(rules.maxLength){
            isValid = value.length <= rules.maxLength && isValid;
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }
        return isValid;
    };

     const inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...orderForm
        };

        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        };

        updatedFormElement.value = event.target.value;
        updatedFormElement.touched = true;
        updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedOrderForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;

        for(let inputIdentifiers in updatedOrderForm){
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        setOrderForm(updatedOrderForm);
        setFormIsValid(formIsValid);


    };

        const formElementsArray = [];

        for (let key in orderForm){
            formElementsArray.push({
                id: key,
                config: orderForm[key]
            })
        }

        let form = (<form onSubmit={orderHandler}>
            {formElementsArray.map(formElement => (
                <Input elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                       value={formElement.config.value}
                       key={formElement.id}
                       invalid={!formElement.config.valid}
                       shouldValidate={formElement.config.validation}
                       touched={formElement.config.touched}
                       changed={(event) => inputChangedHandler(event, formElement.id)}
                />
            ))}
            <Button btnType={"Success"} clicked={orderHandler} disabled={!formIsValid}>ORDER</Button>
        </form>);

        if (props.loading) {
            form = <Spinner/>;
        }

        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        )
}

const mapStateToProps = state =>{
    return{
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
};

const mapDispatchToProps = dispatch =>{
    return {
        onOrderBurger: (orderData,token) => dispatch(actions.purchaseBurger(orderData, token))
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(contactData, axios));