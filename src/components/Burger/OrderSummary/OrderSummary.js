import React from 'react';

import Auxiliar from '../../../hoc/Auxiliar';

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
            <p>Continue to Checkout?</p>
        </Auxiliar>
     );
}
 
export default orderSummary;