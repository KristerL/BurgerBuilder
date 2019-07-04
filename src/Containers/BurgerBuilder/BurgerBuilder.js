import React, {Component} from "react"

import Aux from "../../hoc/Aux/Aux"
import Burger from "../../Components/Burger/Burger"
import BuildControls from "../../Components/Burger/BuildControls/BuildControls"
import Modal from "../../Components/UI/Modal/Modal"
import OrderSummary from "../../Components/Burger/OrderSummary/OrderSummary"
import Spinner from "../../Components/UI/Spinner/Spinner"
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler"

import axios from "../../axios-orders"

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    };

    componentDidMount() {
        axios.get("https://react-596ee.firebaseio.com/ingredients.json").then(response => {
            this.setState({ingredients: response.data})
        }).catch(error => {
            this.setState({error: true})
        });
    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey];
        }).reduce((sum, el) => {
            return sum + el;
        }, 0);

        this.setState({purchasable: sum > 0});
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCounted = oldCount + 1;
        const updatedIngridients = {
            ...this.state.ingredients
        };
        updatedIngridients[type] = updatedCounted;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({totalPrice: newPrice, ingredients: updatedIngridients});
        this.updatePurchaseState(updatedIngridients);
    };

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return;
        }
        const updatedCounted = oldCount - 1;
        const updatedIngridients = {
            ...this.state.ingredients
        };
        updatedIngridients[type] = updatedCounted;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({totalPrice: newPrice, ingredients: updatedIngridients});
        this.updatePurchaseState(updatedIngridients);
    };

    purchaseHandler = () => {
        this.setState({purchasing: true})
    };

    purchaseCancelHandler = () => {
        this.setState({purchasing: false})
    };

    purchaseContinueHandler = () => {
        //alert("You continue!")
        this.setState({loading: true});
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: "Max Schwarss",
                address: {
                    street: "Test street1"
                },
                email: "test@gmail.com"
            },
            deliveryMEthod: "fastest"
        };
        axios.post("/orders.json", order).then(response => {
            this.setState({loading: false, purchasing: false})
        }).catch(error => {
            this.setState({loading: false, purchasing: false})
        })
    };

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary = null;


        let burger = this.state.error ? <p> Ingridients can't be loaded!</p>: <Spinner/>;

        if (this.state.ingredients) {
            burger = (<Aux>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls
                    ingridientAdded={this.addIngredientHandler}
                    ingridientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    purchasable={this.state.purchasable}
                    price={this.state.totalPrice}
                    ordered={this.purchaseHandler}
                />
            </Aux>);
            orderSummary = <OrderSummary
                ingredients={this.state.ingredients}
                purchaseCanceled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
                price={this.state.totalPrice}/>
        }

        if (this.state.loading) {
            orderSummary = <Spinner/>
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);