import React from 'react'
import { useState } from 'react';
import styles from './Checklist.module.css'

export default function Checklist({checklist}) {
    const [items, setItems] = useState(checklist);
    const [isExpanded, setIsExpanded] = useState(false);

   
    const toggleChecklist = () => {
      setIsExpanded(!isExpanded);
    };
  
    const handleCheckboxChange = (index) => {
        const updatedItems = [...items];
        updatedItems[index].checked = !updatedItems[index].checked; // Toggle the checked state
        setItems(updatedItems); 
    }
   
    const checkedItems = items.filter(item => item.checked).length;
    const totalItems = items.length;
  return (
  
       <div className={styles.taskContainer}>
    
      <div className={styles.checklistHeader}>
        <p> Checklist: ({checkedItems}/{totalItems})</p>

     
        <button className={styles.toggleButton} onClick={toggleChecklist}>
          {isExpanded ? '^' : 'v'}
        </button>
      </div>

      
      {isExpanded && (
        <ul className={styles.checklist}>
          {items.map((item, index) => (
            <li key={index}>
              <input
                type="checkbox"
                checked={items[index].checked}
              onChange={()=>handleCheckboxChange (index)}
              />
              {item.label}
            </li>
          ))}
        </ul>
      )}
    
    </div>
  )
}
