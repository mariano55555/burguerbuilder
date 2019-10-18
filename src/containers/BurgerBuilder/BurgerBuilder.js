import React, { Component } from 'react';
import Auxiliar from '../../hoc/Auxiliar/Auxiliar';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import axios from '../../axios-orders';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.4
};

class BurgerBuilder extends Component {

    state = { 
        ingredients: null,
        totalPrice: 4,
        purchaseable: 0,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount(){
        axios.get('https://react-my-burger-b9049.firebaseio.com/ingredients.json')
            .then(response => {
                this.setState({
                    ingredients: response.data
                });
            })
            .catch(error =>{
                this.setState({ error: true });
            });
    }

    

    updatePurchaseState(ingredients){
        // const ingredients = {
        //     ...this.state.ingredients
        // };

        const sum = Object.keys(ingredients)
                    .map(ingredientKey => {
                        return ingredients[ingredientKey]
                    })
                    .reduce((sum, el) => {
                        return sum + el;
                    },0);

        this.setState({
            purchaseable: sum > 0
        })
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;

        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;

        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients
        })

        this.updatePurchaseState(updatedIngredients);
    }
    
    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;

        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;

        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients
        });

        this.updatePurchaseState(updatedIngredients);
    }

    purchaseHandler = () => {
        this.setState({
            purchasing: true
        });
    }

    modalClosedHandler = () => {
        this.setState({
            purchasing: false
        });
    }

    purchaseContinueHandler=()=>{
        //alert("You continue!");
        this.setState({ loading: true });
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Mariano Paz',
                address: {
                    street: 'Test Street 1',
                    zipCode: '123456',
                    country: 'El Salvador'
                },
                email: 'mariano.paz.flores@gmail.com'
            },
            deliveryMethod: 'fastest'
        }
        axios.post('/orders.json', order)
                .then(response => {
                    this.setState({ loading:false, purchasing: false });
                })
                .catch(error =>{
                    this.setState({ loading:false, purchasing: false });
                });
    }
    

    render() { 

        const disabledInfo = {
            ...this.state.ingredients
        }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
            
        }


        let orderSummary = null;

        
        let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;

        if (this.state.ingredients) {
            burger = (
                <Auxiliar>
                    <Burger ingredients={this.state.ingredients}/>
                    <BuildControls
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        disabled={disabledInfo}
                        purchaseable = {this.state.purchaseable}
                        ordered = { this.purchaseHandler }
                        price={ this.state.totalPrice }
                    />
                </Auxiliar>
            );

            orderSummary = <OrderSummary 
                    purchaseContinued={ this.purchaseContinueHandler }
                    purchaseCanceled={ this.modalClosedHandler }
                    price={this.state.totalPrice}
                    ingredients={ this.state.ingredients }/>;
        }

        if (this.state.loading) {
            orderSummary = <Spinner/>;
        }


        return (
            <Auxiliar>
                <Modal show={this.state.purchasing} modalClosed={ this.modalClosedHandler}>
                    {orderSummary}
                </Modal>
                { burger }
            </Auxiliar>  
        );
    }
}
 
export default withErrorHandler(BurgerBuilder, axios);