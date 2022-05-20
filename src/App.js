import './App.css';
import Header from './components/Header/Header';
import Controls from './components/Controls/Controls';
import TaskList from './components/TaskList/TaskList';
import ModalWindow from './components/ModalWindow/ModalWindow';
import { AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

function App() {

  const [modal, setModal] = useState(false);
  const [taskList, setTaskList] = useState([]);
  const [filtered, setFiltered] = useState(taskList);
  const [button, setButton] = useState('all');

  useEffect( () => {
    JSON.parse(localStorage.getItem("taskList")) && setTaskList(JSON.parse(localStorage.getItem("taskList")))
  }, [])

  useEffect( () => {
    setFiltered(taskList)
    setButton('all')
  }, [taskList.length])

  const addTask = task => {
    setTaskList([...taskList, task])
    localStorage.setItem("taskList", JSON.stringify([...taskList, task]))
  }
  
  const deleteTask = task => {
    taskList.splice(taskList.findIndex(el => el.id === task.id), 1)
    localStorage.setItem("taskList", JSON.stringify([...taskList]))
    setTaskList([...taskList])
  }

  const updateListArr = task => {
    taskList[taskList.findIndex( el => el.id === task.id)] = task
    localStorage.setItem("taskList", JSON.stringify([...taskList]))
    setTaskList([...taskList])
  }

  const updateTaskStatus = task => {
    taskList.filter( el => el.id === task.id)[0].isDone = !taskList.filter( el => el.id === task.id)[0].isDone
    console.log(task);
    localStorage.setItem("taskList", JSON.stringify([...taskList]))
    setTaskList([...taskList])
  }

  return (
    <>
      <div className="container">
        <Header />
        <Controls 
          setModal={setModal}
          setFiltered={setFiltered}
          taskList={taskList}
          setButton={setButton}
          button={button}
        />
        <TaskList filtered={filtered} deleteTask={deleteTask} updateListArr={updateListArr} updateTaskStatus={updateTaskStatus} button={button}/>
      </div>  
      <AnimatePresence>
        { modal && <ModalWindow setModal={setModal} addTask={addTask}/>}
      </AnimatePresence>
    </>
  );
}

export default App;
