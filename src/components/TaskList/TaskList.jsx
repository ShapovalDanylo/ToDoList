import React from 'react';
import TaskListItem from '../TaskListItem/TaskListItem';
import classes from './TaskList.module.css';

const TaskList = ({filtered, deleteTask, updateListArr, updateTaskStatus}) => {

    return (
        <div className={classes.taskList_wrapper}>
            {filtered.map( (task, index) => <TaskListItem updateListArr={updateListArr} deleteTask={deleteTask} key={index} task={task} index={index} updateTaskStatus={updateTaskStatus}/>)}
        </div>
    );
};

export default TaskList;