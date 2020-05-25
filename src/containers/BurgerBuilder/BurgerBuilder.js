import React, { Component } from 'react';

import Aux from '../../hoc/Auxuliary';
import Burger from '../../components/Burger/Burger';
import BuilControls from '../../components/Burger/BuildControls/BuildControls'

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
        totalPrice : 4
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
                <Burger ingridients={this.state.ingridients}/>
                <BuilControls 
                ingridientAdded={this.addIngridientHandler}
                ingridientRemoved={this.removeIngridientHandler}
                disabled = {disabledInfo}
                price = {this.state.totalPrice}
                />
            </Aux>
        );
    };
}

export default BurgerBuilder;