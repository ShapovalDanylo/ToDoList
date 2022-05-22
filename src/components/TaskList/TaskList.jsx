import React from 'react';
import TaskListItem from '../TaskListItem/TaskListItem';
import classes from './TaskList.module.css';

const TaskList = ({filtered, deleteTask, updateListArr, updateTaskStatus, button, value, highlight}) => {

    const searchedValue = filtered.filter( task => task.name.toLowerCase().includes(value.toLowerCase()) || task.description.toLowerCase().includes(value.toLowerCase()))

    return (
        <div className={filtered.length && searchedValue.length ? `${classes.taskList_wrapper}` : `${classes.ifNone}`}>
            {searchedValue.length ?
            filtered.length ? 
            searchedValue.map( (task, index) => 
                <TaskListItem 
                    value={value} 
                    updateListArr={updateListArr} 
                    deleteTask={deleteTask} 
                    key={index} task={task} 
                    index={index} 
                    updateTaskStatus={updateTaskStatus} 
                    highlight={highlight}/>)
            : <h2>No {button === 'all' ? `task` : button === 'completed' ? `completed tasks` : `uncompleted tasks`} yet...</h2> : <h2>No task was found</h2>}
        </div>
    );
};

export default TaskList;