import Naavbar from "./Naavbar";
import Sideebar from "./Sideebar";
import { useEffect,useState } from "react";
import { getAllTasks,updateTaskState,deleteTask } from "../services/task";
import Render from "../Component/Render";
import styles from "./Board.module.css"
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import DeletePage from "../Component/DeletePage";
import TaskcreatePage from "./TaskcreatePage";
import Analytics from "./Analytics";
import collapse from "../assets/collapse.png"

export default function Board() {
  const[tasks,setTasks]=useState({
    backlog:[],
    todo:[],
    inprogress:[],
    done:[]
  })

  const[isCreatingTask,setIscreatingTask]=useState(false)

  const[isloading,setIsloading]=useState(true)
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [filter, setFilter] = useState(null);




  const [analytics, setAnalytics] = useState({
    highPriority: 0,
    moderatePriority: 0,
    lowPriority: 0,
    todoCount: 0,
    backlogCount: 0,
    inProgressCount: 0,
    doneCount: 0,
    dueTodayCount: 0,
  });

  const [isChecklistCollapsed, setIsChecklistCollapsed] = useState({
    backlog: false,
    todo: false,
    inprogress: false,
    done: false
  });
  useEffect(()=>{
    fetchTask();
  },[]);

  const fetchTask=async()=>{
    try{
    const res=await getAllTasks();
    if(res.status===200){
      const groupedTask=groupTaskByState(res.data);
      setTasks(groupedTask)
    }
  }
  catch(error){
    if (error.response && error.response.status === 401) {
      console.error("Unauthorized! Redirect to login.");
      localStorage.removeItem("token")
      window.location.href="/"
  }
  else{
    console.error("Error fetching tasks:", error);
  }
  }
  finally{
    setIsloading(false)
  }
  };

  const groupTaskByState=(tasks)=>{
    return tasks.reduce((acc, task) => {
    
      if (!acc[task.state]) {
        acc[task.state] = []; 
      }
      acc[task.state].push(task); 
      return acc;
    }, { backlog: [], todo: [], inprogress: [], done: [] });
  }


  const handleStateChange=async(taskId,newState)=>{
    await updateTaskState(taskId,{state:newState})
    fetchTask();
  }

  const handleDelete=async()=>{
    if(taskToDelete){
    await deleteTask(taskToDelete)
    fetchTask();
    setIsDeleteModalVisible(false)
    setTaskToDelete(null)
  }
  }

  const confirmDelete=(taskId)=>{
    setTaskToDelete(taskId)
    setIsDeleteModalVisible(true)
  }

  const handleShare=(taskId)=>{
    const taskLink=`${window.location.origin}/task/${taskId}`
    navigator.clipboard.writeText(taskLink)
    toast('Link copied')
    console.log('Link copied')
    alert('Link copied')
  }


  const handleEdit = (taskDetails) => {
    setCurrentTask(taskDetails); 
    setIscreatingTask(true); 
  };

 const handleTaskcreationClose=()=>{
  setIscreatingTask(false)
  setCurrentTask(null);
  fetchTask();
 
 }

 const handleFilterChange = (filterType) => {
  setFilter(filterType);
};


const calculateAnalytics = (tasks) => {
  const today = new Date();
  const highPriorityCount = tasks.filter((task) => task.priority === 'high').length;
  const moderatePriorityCount = tasks.filter((task) => task.priority === 'moderate').length;
  const lowPriorityCount = tasks.filter((task) => task.priority === 'low').length;
  const todoCount = tasks.filter((task) => task.state === 'todo').length;
  const backlogCount = tasks.filter((task) => task.state === 'backlog').length;
  const inProgressCount = tasks.filter((task) => task.state === 'inprogress').length;
  const doneCount = tasks.filter((task) => task.state === 'done').length;

  const dueTodayCount = tasks.filter(
    (task) => new Date(task.dueDate).toLocaleDateString() === new Date().toLocaleDateString()
  ).length;

  setAnalytics({
    highPriority: highPriorityCount,
    moderatePriority: moderatePriorityCount,
    lowPriority: lowPriorityCount,
    todoCount,
    backlogCount,
    inProgressCount,
    doneCount,
    dueTodayCount,
  });
}


const handleCollapseToggle = (section) => {
  setIsChecklistCollapsed(prevState => ({
    ...prevState,
    [section]: !prevState[section]
  }));
};
 
  return (
    <div className={styles.board}>
     <div>
    <Sideebar/>
    </div>
    <div className={styles.right}>
      <div className={styles.nav}>
    <Naavbar onFilterChange={handleFilterChange}/>
    </div>
    <div className={styles.parts}>
      <div className={styles.part}>
        <div className={styles.collapse}>
          <h3>Backlog</h3>
          <img src={collapse} alt="" onClick={()=>handleCollapseToggle('backlog')}/>
          </div>
          {isloading ? <p>Loading...</p> :<Render tasks={tasks.backlog} currentState="backlog" onStateChange={handleStateChange} onDelete={confirmDelete} onShare={handleShare} onEdit={handleEdit} filter={filter} isChecklistCollapsed={isChecklistCollapsed.backlog}/>}
          </div>
          <div className={styles.part}>
            <div className={styles.collapse}>
          <h3>To Do</h3>
          <button onClick={()=>setIscreatingTask(true)}>+ Add Task</button>
      
           <img src={collapse} alt="" onClick={() => handleCollapseToggle('todo')}/>
           </div>
          {isloading ? <p>Loading...</p> : <Render tasks={tasks.todo} currentState="todo" onStateChange={handleStateChange} onDelete={confirmDelete} onShare={handleShare} onEdit={handleEdit} filter={filter} isChecklistCollapsed={isChecklistCollapsed.todo}/>}
          </div>

          <div className={styles.part}>
            <div className={styles.collapse}>
          <h3>In Progress</h3>  
          <img src={collapse} alt="" onClick={() => handleCollapseToggle('inprogress')} />
          </div>
          {isloading ? <p>Loading...</p> : <Render tasks={tasks.inprogress} currentState="inprogress" onStateChange={handleStateChange} onDelete={confirmDelete} onShare={handleShare} onEdit={handleEdit} filter={filter} isChecklistCollapsed={isChecklistCollapsed.inprogress}/>}
          </div>

          <div className={styles.part}>
            <div className={styles.collapse}>
         
          <h3>Done</h3>
          <img src={collapse} alt="" onClick={() => handleCollapseToggle('done')}/>
          </div>
          {isloading ? <p>Loading...</p> : <Render tasks={tasks.done} currentState="done" onStateChange={handleStateChange} onDelete={confirmDelete}  onShare={handleShare} onEdit={handleEdit} filter={filter} isChecklistCollapsed={isChecklistCollapsed.done} />}
          </div>
    
    </div>
    </div>


    {isCreatingTask && (
            <TaskcreatePage onClose={()=>setIscreatingTask(false)}
            onSave={handleTaskcreationClose} />
            
          )}
    {isDeleteModalVisible &&(
      <DeletePage 
      onConfirm={handleDelete}
      onCancel={()=>setIsDeleteModalVisible(false)}/>
    )}
    
    </div>
  );
}
