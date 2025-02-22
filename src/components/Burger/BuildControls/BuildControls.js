import React from 'react'

import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';


const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' }
];

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        
        <h3>Current Price: <strong>{ props.price.toFixed(2) }</strong> </h3>

        { controls.map(ctrl => (
            <BuildControl 
                    key={ctrl.label} 
                    label={ctrl.label} 
                    added={ () => props.ingredientAdded(ctrl.type) } 
                    removed={ () => props.ingredientRemoved(ctrl.type) } 
                    disabled={ props.disabled[ctrl.type] } 
                    />
        ))}
        <button className={classes.OrderButton}
                disabled={ !props.purchaseable }
                onClick={ props.ordered }
                >ORDER NOW</button>
    </div>
)
 
 
export default buildControls;