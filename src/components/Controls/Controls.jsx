import React, { useEffect, useMemo } from 'react';
import classes from './Controls.module.css';
import ControlItem from '../ControlItem/ControlItem';

const Controls = ({setModal, setFiltered, taskList, button, setButton, setValue}) => {

    const completed = useMemo(() => taskList.filter(task => task.isDone), [taskList])
    const uncompleted = useMemo(() => taskList.filter( task => !task.isDone), [taskList])

    useEffect( () => {
        if(button === 'all'){
            setFiltered(taskList);
        }else if(button === 'completed'){
            setFiltered(completed);
        }else {
            setFiltered(uncompleted);
        }
    }, [taskList, button])

    const controls = [
        {
            name: "Add Task",
            purpose: function() {
                setModal(true)
            }
        },
        {
            name: "Show all",
            purpose: function() {
                setButton('all')
            }
        },
        {
            name: "Show completed",
            purpose: function() {
                setButton('completed')
            }
        },
        {
            name: "Show uncompleted",
            purpose: function() {
                setButton('uncompleted')
            }
        }
    ]

    return (
        <>
            <div className={classes.controls_wrapper}>
                {controls.map( (control, index) => <ControlItem key={index} control={control} button={button}/>)}
            </div>
            <div className={classes.search_wrapper}>
                <input className={classes.search} type="text" placeholder='Search...' onChange={e => setValue(e.target.value)}></input>
                <i className="fa-solid fa-magnifying-glass" />
            </div>
        </>
    );
};

export default Controls;