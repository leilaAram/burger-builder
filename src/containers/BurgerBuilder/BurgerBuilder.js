import React, { Component } from 'react';

import Aux from '../../hoc/Auxuliary';
import Burger from '../../components/Burger/Burger';
import BuilControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'

const INGRIDIENT_PRICES = {
    salad : 0.5,
    bacon : 0.4,
    cheese : 0.6,
    meat : 1.3
};
class BurgerBuilder extends Component {
    state = {
        ingridients : {
            salad : 0,
            bacon : 0,
            cheese : 0,
            meat: 0
        },
        totalPrice : 4,
        purchasable: false,
        purchasing: false
    }

    purchasHandler = () => {
        this.setState({purchasing: true});
    }

    purchasCancleHandler = () =>{
        this.setState({purchasing: false});
    }

    purchasContinuedHandler = () =>{
        alert('OK');
    }

    updatePurchaseState(ingridients){
        const sum = Object.keys(ingridients)
            .map(igkey => {
                return ingridients[igkey]
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
            this.setState({purchasable: sum > 0});
    }
    addIngridientHandler = (type) =>{
        const oldCount = this.state.ingridients[type];
        const updatedCount = oldCount + 1;
        const updatedIngridients = {
            ...this.state.ingridients
        };
        updatedIngridients[type] = updatedCount;
        const oldPrice = this.state.totalPrice;
        const priceAddition = INGRIDIENT_PRICES[type];
        const updatedPrice = oldPrice + priceAddition;
        this.setState({totalPrice:updatedPrice , ingridients : updatedIngridients});
        this.updatePurchaseState(updatedIngridients);
    }

    removeIngridientHandler = (type) =>{
        const oldCount = this.state.ingridients[type];
        if (oldCount<= 0){
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngridients = {
            ...this.state.ingridients
        };
        updatedIngridients[type] = updatedCount;
        const oldPrice = this.state.totalPrice;
        const priceDeduction = INGRIDIENT_PRICES[type];
        const updatedPrice = oldPrice - priceDeduction;
        this.setState({totalPrice:updatedPrice , ingridients : updatedIngridients});
        this.updatePurchaseState(updatedIngridients);
    }
    render(){
        const disabledInfo = {
            ...this.state.ingridients
        };
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        return(
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchasCancleHandler}>
                    <OrderSummary ingridients={this.state.ingridients}
                    price = {this.state.totalPrice}
                    purchasCalnclled = {this.purchasCancleHandler}
                    purchasContinued = {this.purchasContinuedHandler}/>
                </Modal>
                <Burger ingridients={this.state.ingridients}/>
                <BuilControls 
                ingridientAdded={this.addIngridientHandler}
                ingridientRemoved={this.removeIngridientHandler}
                disabled = {disabledInfo}
                purchasable = {this.state.purchasable}
                price = {this.state.totalPrice}
                ordered = {this.purchasHandler}
                />
            </Aux>
        );
    };
}

export default BurgerBuilder;