import React from 'react';

import Auxiliar from '../../../hoc/Auxiliar';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
    
    const ingredientSummary = Object.keys(props.ingredients)
                                .map(ingredientKey => {
                                    return (<li key={ingredientKey}>
                                                <span style={{ textTransform: 'capitalize'}}>{ingredientKey}</span>: {props.ingredients[ingredientKey]}
                                            </li>);
                                });


    return ( 
        <Auxiliar>
            <h3>Your Order</h3>
            <h3>A delicious burger with the following ingredients:</h3>
            <ul>{ ingredientSummary }</ul>
            <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
            <p>Continue to Checkout?</p>
            <Button btnType="Danger" clicked={ props.purchaseCanceled }>CANCEL</Button>
            <Button btnType="Success" clicked={ props.purchaseContinued }>CONTINUE</Button>
        </Auxiliar>
     );
}
 
export default orderSummary;