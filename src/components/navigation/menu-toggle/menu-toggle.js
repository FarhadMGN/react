import React from 'react'
import classes from './menu-toggle.module.css'


export const MenuToggle = props => {
    const cls = [
        classes.MenuToggle,
    ];

    if (props.isOpen) {
        cls.push('fa-times');
        cls.push(classes.open);
    } else {
        cls.push('fa-bars');
        console.log("HERE!");
    }
    return (

            <i
                className={cls.join(' ')}
                onClick={props.onToggle}
            >
            </i>

    )
};

export default MenuToggle;
