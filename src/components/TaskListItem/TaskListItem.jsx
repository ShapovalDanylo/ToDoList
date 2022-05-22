import React, { useCallback, useState } from 'react';
import classes from './TaskListItem.module.css';
import ModalWindow from '../ModalWindow/ModalWindow';
import { AnimatePresence } from 'framer-motion';

const TaskListItem = ({task, deleteTask, updateListArr, updateTaskStatus, value, highlight}) => {

    const [modal, setModal] = useState(false);

    const handleDelete = () => {
        window.confirm("Are you sure you want to delete the task?") && deleteTask(task)
    }

    const editTask = task => {
        updateListArr(task)
        setModal(false)
    }

    const handleChangeStatus = () => {
        updateTaskStatus(task)
    }

    const enlighten = useCallback(string => highlight(value, string), [value])

    return (
        <>
            <div 
                className={task.isDone ? `${classes.item_content_wrapper} ${classes.item_done}` : `${classes.item_content_wrapper}`}
                style={{borderTop: `5px solid ${task.color}`}}
            >
                <div className={classes.item_content}>
                    <div className={classes.item__header}>
                        <h2>{enlighten(task.name)}</h2>
                    </div>
                    <hr className={classes.hr_line} style={{border: `1px solid ${task.color}`,backgroundColor: `${task.color}`}}/>
                    <div className={classes.item__body}>
                        <p>{enlighten(task.description)}</p>
                    </div>
                    <hr className={classes.hr_line} style={{border: `1px solid ${task.color}`,backgroundColor: `${task.color}`}}/>
                    <div className={classes.item__footer}>
                        <i onClick={handleChangeStatus} className={task.isDone ? "fa-solid fa-lock" : "fa-solid fa-lock-open"}/>
                        <i onClick={!task.isDone ? () => setModal(true) : null} className="far fa-edit" />
                        <i onClick={handleDelete} className="fas fa-trash-alt" />
                    </div>
                </div>
            </div>
            <AnimatePresence>
                {modal && <ModalWindow setModal={setModal} editTask={editTask} task={task}/>}
            </AnimatePresence>
        </>
    );
};

export default TaskListItem;