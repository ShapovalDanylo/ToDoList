import React from 'react';
import TaskListItem from '../TaskListItem/TaskListItem';
import classes from './TaskList.module.css';

const TaskList = ({filtered, deleteTask, updateListArr, updateTaskStatus, button}) => {

    return (
        <div className={filtered.length ? `${classes.taskList_wrapper}` : `${classes.ifNone}`}>
            {filtered.length ? 
            filtered.map( (task, index) => <TaskListItem updateListArr={updateListArr} deleteTask={deleteTask} key={index} task={task} index={index} updateTaskStatus={updateTaskStatus}/>)
            : <h2>No {button === 'all' ? `task` : button === 'completed' ? `completed tasks` : `uncompleted tasks`} yet...</h2>
            }
        </div>
    );
};

export default TaskList;