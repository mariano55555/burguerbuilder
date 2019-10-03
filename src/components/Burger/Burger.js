import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
    console.log(props.ingredients["cheese"]);
    let transformedIngredients = Object.keys(props.ingredients)
                                        .map(ingredientKey => {
                                            // console.log(ingredientKey);
                                            // console.log([...Array(props.ingredients[ingredientKey])]);
                                            return [...Array(props.ingredients[ingredientKey])].map((_, i) => {
                                                return <BurgerIngredient key={ingredientKey + i}  type={ingredientKey } />
                                            });
                                        })
                                        .reduce((arr, el) => {
                                            //console.log(arr);
                                            //console.log(el);
                                            return arr.concat(el)
                                        }, []);

                                        console.log(transformedIngredients);
    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Please, start adding ingredients!</p>
    }

    return ( 
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            { transformedIngredients }
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
}
 
export default burger;