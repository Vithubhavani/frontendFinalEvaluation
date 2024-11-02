import React, { useState, useEffect } from 'react';
import { getAssignee, createTask,updateTask } from '../services/task'; // Add the backend API call to fetch assignees and create tasks
 import DatePicker from 'react-datepicker'
 import "react-datepicker/dist/react-datepicker.css";
 import styles from './TaskCreatePage.module.css'
import Delete from '../assets/Delete.png'
import {format} from 'date-fns'

const TaskCreationComponent = ({ onClose, onSave }) => {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('Lowpriority');
  const [assignee, setAssignee] = useState('');
  const [checklist, setChecklist] = useState([]);
  const [newChecklistItem, setNewChecklistItem] = useState('');
  const [dueDate, setDueDate] = useState(null);
  const [assignees, setAssignees] = useState([]);


  const [titleError, setTitleError] = useState('');
  const [priorityError, setPriorityError] = useState('');
  const [checklistError, setChecklistError] = useState('');


 

  useEffect(() => {
    async function fetchAssignees() {
      const res = await getAssignee();
      setAssignees(res.data);
    }
    fetchAssignees();
  }, []);

  const handleAddChecklistItem = () => {
  
      setChecklist([...checklist, { text: newChecklistItem, checked: false }]);
      setNewChecklistItem('');
   
  };

  const handleChecklistToggle = (index) => {
    const updatedChecklist = checklist.map((item, idx) =>
      idx === index ? { ...item, checked: !item.checked } : item
    );
    setChecklist(updatedChecklist);
  };

  const handleSave = async () => {
    setTitleError('');
    setPriorityError('');
    setChecklistError('');

    let isValid = true;

   
    if (!title.trim()) {
      setTitleError('Title is required.');
      isValid = false;
    }

   
    if (!priority) {
      setPriorityError('Priority is required.');
      isValid = false;
    }

    
    if (checklist.length === 0) {
      setChecklistError('Checklist must have at least one item.');
      isValid = false;
    }

    if (!isValid) return;

    const newTask = {
      title,
      priority,
      assignee,
      checklist: checklist.map(item => item.text),
      dueDate: dueDate ? dueDate.toISOString() : null,
    };

    
        await createTask(newTask);
       
      onSave();
      alert('Task created successfully!');
    
      onClose();
    

  };

  const getChecklistCount = () => {
    const completed = checklist.filter((item) => item.checked).length;
    return `${completed}/${checklist.length}`;
  };

  const handleDeleteChecklistItem = (index) => {
    const updatedChecklist = checklist.filter((_, idx) => idx !== index);
    setChecklist(updatedChecklist);
  };

  return (
    <div style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'white',
      padding: '20px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
      width:'600px',
      height:'700px',
      display:'flex',
      flexDirection:'column',
      gap:'30px',
      borderRadius:'22px'
    }}>
     

      <div className={styles.tasktitle}>
        <p className={styles.tasktitle1}>Title <span>*</span></p>
      <input
        type="text"
        placeholder="Task title"
        value={title}
        className={styles.name}
        onChange={(e) => setTitle(e.target.value)}
      />
       
      </div>
      {titleError && <span style={{color:'red'}}>{titleError}</span>}
      <div className={styles.prioBut}>
      <p className={styles.tasktitle1}>Select Priority <span >*</span></p>
      <div className={styles.buttons}>
        <button 
          onClick={() => setPriority('Lowpriority')}
          className={styles.high}
          style={{backgroundColor: priority === 'Lowpriority' ? '#EEECEC' : 'white'}}
        >
          Low priority
        </button>
        <button 
          onClick={() => setPriority('Moderatepriority')} 
          className={styles.high}
          style={{backgroundColor: priority === 'Moderatepriority' ? '#EEECEC' : 'white'}}
        >
          Moderate priority
        </button>
        <button 
          onClick={() => setPriority('Highpriority')}
         className={styles.high} 
         style={{backgroundColor: priority === 'Highpriority' ? '#EEECEC' : 'white'}}
        >
         
          High priority
        </button>
      </div>
      {priorityError && <span style={{color:'red'}}>{priorityError}</span>}
      </div>
      <div className={styles.ASS}>
      <p>Assign to</p>
      <select value={assignee} onChange={(e) => setAssignee(e.target.value)} className={styles.assign}>
        <option value="">Add assignee</option>
        {assignees.map((user) => (
          <option key={user._id} value={user.email}>
            {user.email}
          </option>
        ))}
      </select>
      </div>
      <div>
        <h4 className={styles.tasktitle1}>  Checklist <span>*</span> ({getChecklistCount()}) </h4>
        <div className={styles.checkitem}>
        {checklist.map((item, index) => (
          <div key={index} className={styles.item}>
            <input
              type="checkbox"
              checked={item.checked}
              onChange={() => handleChecklistToggle(index)}
              className={styles.items}
            />
            
            <span>{item.text}</span>
            <img src={Delete} alt=""  onClick={() => handleDeleteChecklistItem(index)} className={styles.delete}/>
          </div>
        ))}
       
        </div>
        {checklistError && <span style={{color:'red'}}>{checklistError}</span>}

        <div style={{marginTop:"10px"}} >
        <input
          type="text"
          placeholder="Add checklist item"
          value={newChecklistItem}
          onChange={(e) => setNewChecklistItem(e.target.value)}
          className={styles.itemscheck}
        />
        </div>
        <button onClick={handleAddChecklistItem} style={{marginTop:"6px"}}>+ Add New</button>
      </div>


     <div style={{display:'flex',gap:'20px',marginTop:"50px"}}>
      <div>
        <h4>Due Date</h4>
        <div  >
        <DatePicker
            selected={dueDate}
            onChange={(date) => setDueDate(date)}
            dateFormat="yyyy-MM-dd"
            className={styles.duedate}
       
        />
        </div>
      </div>

      <div className={styles.savecan}>
        <button onClick={handleSave} className={styles.save}>  Save</button>
        <button onClick={onClose} className={styles.cancel}>Cancel</button>
      </div>
    </div>
    </div>
  );
};

export default TaskCreationComponent;
