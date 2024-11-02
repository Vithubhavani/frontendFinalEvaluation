
import TaskOptions from './Taskoptions';
import styles from './Render.module.css'
import {useState,useEffect} from 'react'

export default function Render({tasks,currentState,onStateChange,onDelete,onShare,onEdit,filter,isChecklistCollapsed}) {
  

   const isDueToday = (dueDate) => {
    const today = new Date();
    const due =new Date(dueDate);

    return today.getFullYear()===due.getFullYear() && 
    today.getMonth()===due.getMonth() && 
    today.getDate()===due.getDate()
  };

  const isDueThisWeek = (dueDate) => {
    const today = new Date();
    const currentDayOfWeek = today.getDay();
    const startOfWeek = new Date(today.setDate(today.getDate() - currentDayOfWeek));
    const endOfWeek = new Date(today.setDate(today.getDate() + 6));
    const due = new Date(dueDate);
    return due >= startOfWeek && due <= endOfWeek;
  };

  const isDueThisMonth = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    return today.getMonth() === due.getMonth() && today.getFullYear() === due.getFullYear();
  };

  const isOverdue = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);


    return due < today && !isDueToday(dueDate);
  };

  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'Highpriority':
        return styles.high;
      case 'Moderatepriority':
        return styles.moderate;
      case 'Lowpriority':
        return styles.low;
      default:
        return '';
    }
  };

  const formatEmail = (email) => {
    if (!email) return '';
  
 
    const firstTwoLetters = email.slice(0, 2).toUpperCase();
  
    return firstTwoLetters;
  };

  const truncateTitle = (title, limit = 20) => {
    return title.length > limit ? title.substring(0, limit) + "…" : title;
  };

  const initializeChecklistState = (checklist = []) => {
    return checklist.map((item) => ({ text: item, checked: false }));
  };


  const [checklistState, setChecklistState] = useState(
    tasks.map((task) => initializeChecklistState(task.checklist))
  );

  const [isChecklistVisible, setIsChecklistVisible] = useState(
    tasks.map(() => true) 
  );

  useEffect(() => {
    setChecklistState(tasks.map((task) => initializeChecklistState(task.checklist)));
    setIsChecklistVisible(tasks.map(() => true));
  }, [tasks]);

  const handleCheckboxChange = (taskIndex, itemIndex) => {
    const newChecklistState = [...checklistState];
    newChecklistState[taskIndex][itemIndex].checked = !newChecklistState[taskIndex][itemIndex].checked;
    setChecklistState(newChecklistState);
  };
  
  const toggleChecklistVisibility = (taskIndex) => {
    const newVisibilityState = [...isChecklistVisible];
    newVisibilityState[taskIndex] = !newVisibilityState[taskIndex];
    setIsChecklistVisible(newVisibilityState);
  };

  const getCheckedCount = (taskIndex) => {
    const checklist = checklistState[taskIndex];
    if (Array.isArray(checklist)) {
      return checklist.filter((item) => item.checked).length;
    }
    return 0;
  };

  return (
    <div className={styles.container}>
  {tasks.map((task,taskIndex)=>(
    <div key={task._id} className={styles.eachtask}>
      <div className={styles.prioass}>
        <div className={styles.pd}>
      <span className={`${styles.colorDot} ${getPriorityClass(task.priority)}`}></span>
       <p className={styles.priority}>{task.priority}</p>
   
       </div>
       <p className={styles.assignee}>{formatEmail(task.assignee?.email)|| ''}</p>
       
       <div className={styles.threedot}>
       <TaskOptions 
            taskId={task._id}
            onDelete={onDelete}
            onShare={onShare}
            onEdit={onEdit}
           
          />
          </div>
       </div>
    <p className={styles.title} title={task.title}>{truncateTitle(task.title)}</p>
    <div className={styles.checklist}>
            <div className={styles.checklistHeader}>
              <h4  className={styles.checkhead}>
                Checklist ({getCheckedCount(taskIndex)}/{task.checklist.length})
              </h4>
              <button onClick={() => toggleChecklistVisibility(taskIndex)} className={styles.udarrow}>
                {isChecklistVisible[taskIndex] ? '^' : 'v'}
              </button>
            </div>

         
            {isChecklistVisible[taskIndex] && !isChecklistCollapsed && (
              <div className={styles.checklistItems}>
                {task.checklist && task.checklist.length > 0 ? (
                  checklistState[taskIndex].map((item, itemIndex) => (
                    <div key={itemIndex} className={styles.checklistitem}>
                      <input
                        type="checkbox"
                        checked={item.checked}
                        onChange={() => handleCheckboxChange(taskIndex, itemIndex)}
                   
                     />
                      <label>{item.text}</label>
                    </div>
                  ))
                ) : (
                  <p>No checklist items</p>
                )}
              </div>
            )}
          </div>

          <div className={styles.duestate}>
    <p  className={styles.duedate} style={{
              backgroundColor:currentState==='done'?'green':
                (filter === 'today' && (isDueToday(task.dueDate) || isOverdue(task.dueDate))) ||
                (filter === 'thisWeek' && isDueThisWeek(task.dueDate)) ||
                (filter === 'thisMonth' && isDueThisMonth(task.dueDate))
                  ? 'red'
                  : '#EEECEC',
            }}> {new Date(task.dueDate).toLocaleDateString('en-US',{month:'short',day:'numeric'})}</p>
    {['backlog', 'todo', 'inprogress', 'done'].filter(state => state !== currentState).map((state) => (
    <button key={state} onClick={() => onStateChange(task._id, state)} className={styles.statebtn}> {state}</button>
                    ))}
    </div>
    </div>
        ))}

        </div>
    )
}
