import React, { useEffect, useState } from 'react';
import classes from './ModalWindow.module.css';
import { motion } from 'framer-motion';
import uuid from 'react-uuid';

const ModalWindow = ({setModal, addTask="", editTask = "", task=""}) => {

    const [taskName, setTaskName] = useState('');
    const [taskDescription, setTaskDescription] = useState('');

    useEffect( () => {
        setTaskName(task.name)
        setTaskDescription(task.description)
    }, [task.name, task.description])

    const handleChange = e => {
        const {name, value} = e.target;

        name === "name" ? setTaskName(value) : setTaskDescription(value);
    }

    const handleCreate = () => {
        addTask({
            name: taskName,
            description: taskDescription,
            color: `#${Math.floor(Math.random() * 2 ** 24).toString(16).padStart(6, `0`)}`,
            isDone: false,
            id: uuid()
        });
        setModal(false);
    }
 
    const handleUpdate = e => {
        e.preventDefault()
        editTask({
            name: taskName,
            description: taskDescription,
            color: task.color,
            isDone: false,
            id: task.id
        })
    }

    return (
        <>
            <motion.div 
                className={classes.modal_backdrop}
                initial={{
                    opacity: 0
                }}
                animate={{
                    opacity: 1,
                    transition: {
                        duration: 0.3
                    }
                }}
                exit={{
                    opacity: 0,
                    transition: {
                        delay: 0.3
                    }
                }}
                onClick={() => setModal(false)}
            ></motion.div>
                <motion.div 
                    className={classes.modal_content_wrapper}
                    initial={{
                        x: 100,
                        scale: 0
                    }}
                    animate={{
                        scale: 1,
                        x:0,
                        transition: {
                            delay: 0.3,
                            duration: 0.3
                        }
                    }}
                    exit={{
                        x:100,
                        scale: 0,
                        transition: {
                            delay: 0.3,
                            duration: 0.3
                        }
                    }}
                >
                    <motion.div 
                        className={classes.modal_content}
                        initial={{
                            scale: 0,
                            x: 100,
                            opacity: 0
                        }}
                        animate={{
                            x: 0,
                            scale: 1,
                            opacity: 1,
                            transition: {
                                delay: 0.3,
                                duration: 0.3
                            }
                        }}
                        exit={{
                            x: 100,
                            opacity: 0,
                            scale: 0,
                            transition: {
                                delay: 0.3,
                                duration: 0.3
                            }
                        }}
                    >
                        <div className={classes.modal__header}>
                            <h1>{addTask ? 'Create Task' : 'Edit Task'}</h1>
                        </div>
                        <hr className={classes.lines}/>
                        <div className={classes.modal__body}>
                            <form>
                                <div className={`${classes.form__el} ${classes.taskName}`}>
                                    <label htmlFor='name'>Task Name</label>
                                    <div className={classes.form__el_wrapper}>
                                        <input type="text" value={taskName || ''} id="name" onChange={handleChange} name="name" placeholder='New task...'/>
                                        <div className={taskName?.length > 21 || !taskName ? `${classes.form__input_limit} ${classes.limit_active}` : `${classes.form__input_limit}`}>{taskName?.length || 0}/21</div>
                                    </div>
                                </div>
                                <div className={`${classes.form__el} ${classes.description}`}> 
                                    <label htmlFor='desc'>Description</label>
                                    <div className={classes.form__el_wrapper}>
                                        <textarea rows="5" value={taskDescription || ''} id="desc" onChange={handleChange} name="description" placeholder='What to do first?'></textarea>
                                        <div className={taskDescription?.length > 180 ? `${classes.form__textarea_limit} ${classes.limit_active}` : `${classes.form__textarea_limit}`}>{taskDescription?.length || 0}/180</div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <hr className={classes.lines}/>
                        <div className={classes.modal__footer}>
                            <div className={classes.footer__create}>
                                <button 
                                    onClick={addTask ? handleCreate : handleUpdate} 
                                    disabled={
                                        !taskName?.length 
                                        || (taskName?.length > 21)
                                        || (taskDescription?.length > 180)
                                    }
                                    className={ !taskName?.length 
                                        || (taskName?.length > 21)
                                        || (taskDescription?.length > 180) ?
                                        `${classes.create_disabled}` : `${classes.create_unable}`
                                    }
                                >{addTask ? 'Create' : 'Update'}</button>
                            </div>
                            <div className={classes.footer__cancel}>
                                <button onClick={() => setModal(false)}>Cancel</button>
                            </div>
                        </div>
                    </motion.div>
                </motion.div> 
        </>
    );
};

export default ModalWindow;