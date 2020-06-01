import React from 'react';

import Aux from '../../../hoc/Auxuliary'
import Button from '../../UI/Button/Button'


const orderSummary = (props) =>{
const ingridientSummary = Object.keys ( props.ingridients )
    .map(igKey => {
        return (
            <li key={igKey}>
                <span style={{ textTransform: 'capitalize'}}>{igKey}:</span> {props.ingridients[igKey]} 
            </li>
        );
    });

    return (
    <Aux>
        <h3>Your Order</h3>
        <p>A deliciuos Burger with the following ingridients:</p>
        <ul>
            {ingridientSummary}
        </ul>
        <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
        <p>Continue to Checkout?</p>
        <Button btnType="Danger" clicked={props.purchasCalnclled}>CANCLE</Button>
        <Button btnType="Success" clicked={props.purchasContinued}>CONTINUE</Button>
    </Aux>
    );
}

export default orderSummary;