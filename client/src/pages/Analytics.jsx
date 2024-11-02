import Sideebar from "./Sideebar";
import { useEffect,useState } from "react";
import { getAllTasks } from "../services/task";
import styles from './Analytics.module.css'


export default function Analytics() {


  const [taskData, setTaskData] = useState({
    highPriorityCount: 0,
    moderatePriorityCount: 0,
    lowPriorityCount: 0, 
    todoCount: 0,
    backlogCount: 0,
    inProgressCount: 0,
    doneCount: 0,
    totalDueToday: 0,
  });

  useEffect(() => {
    fetchTaskData();
  }, []);

  const fetchTaskData = async () => {
    try {
      const response = await getAllTasks();
      if (response.status === 200) {
        const tasks = response.data;
        calculateTaskCounts(tasks);
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const calculateTaskCounts = (tasks) => {

    const today = new Date().toISOString().split('T')[0];

    
    const highPriorityCount = tasks.filter(task => task.priority === 'Highpriority').length;
    const moderatePriorityCount = tasks.filter(task => task.priority === 'Moderatepriority').length;
    const lowPriorityCount = tasks.filter(task => task.priority === 'Lowpriority').length;
    
    const todoCount = tasks.filter(task => task.state === 'todo').length;
    const backlogCount = tasks.filter(task => task.state === 'backlog').length;
    const inProgressCount = tasks.filter(task => task.state === 'inprogress').length;
    const doneCount = tasks.filter(task => task.state === 'done').length;
    
   
    const totalDueToday = tasks.filter(task => new Date(task.dueDate).toISOString().split('T')[0] === today).length;

  
    setTaskData({
      highPriorityCount,
      moderatePriorityCount,
      lowPriorityCount,
      todoCount,
      backlogCount,
      inProgressCount,
      doneCount,
      totalDueToday,
    });
  };
  return (
    <div className={styles.analytic}>
    <Sideebar/>
    <div className={styles.Analytics}>
      <p>Analytics</p>
      <div className={styles.twoparts}>
    <div className={styles.part1}>
      <ul>
    <li>High Priority Tasks: {taskData.highPriorityCount}</li>
      <li>Moderate Priority Tasks: {taskData.moderatePriorityCount}</li>
      <li>Low Priority Tasks: {taskData.lowPriorityCount}</li>
      </ul>
    </div>
    <div className={styles.part1}>
      <li>To-Do Tasks: {taskData.todoCount}</li>
      <li>Backlog Tasks: {taskData.backlogCount}</li>
      <li>In Progress Tasks: {taskData.inProgressCount}</li>
      <li>Done Tasks: {taskData.doneCount}</li>
      <li>Tasks Due Today: {taskData.totalDueToday}</li>
    </div>
    </div>
    </div>
    </div>
  )
}
