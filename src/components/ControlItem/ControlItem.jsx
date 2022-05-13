import React from 'react';
import classes from './ControlItem.module.css'

const ControlItem = ({control, button}) => {

    return (
        <div className={control.name.split(' ')[1] === button ? `${classes.control_el} ${classes.control_active}` : `${classes.control_el}`}>
            <button onClick={control.purpose}>{control.name}</button>
        </div>
    );
};

export default ControlItem;