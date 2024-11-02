

export default function TaskForm({
    title,
    setTitle,
    priority,
    setPriority,
    assignee,
    setAssignee,
    assigneeList,
    setAssigneeList,
    checklist,
    setChecklist,
    dueDate,
    setDueDate,
    error,
    setError,
    handleChecklistChange,
    addChecklist,
    handelSubmit
}) {
  return (
    <div>
     <input type="text" 
     value={title} 
     placeholder="Title" 
     onChange={(e) => setTitle(e.target.value)}/> 
     {error?.title && <p>Title is required</p>}


     <select value={assignee}
     onChange={(e) => setAssignee(e.target.value)}>
     <option value="">select Assignee</option>
     {assigneeList.map((email, index) => (
      <option key={index} value={email}>{email}</option>
        ))}
     </select>
     {error?.assignee && <p>assignee is required</p>}

     
     <select value={priority}
     onChange={(e) => setPriority(e.target.value)}>
        <option value="Lowpriority">Lowpriority</option>
        <option value="Highpriority">Lowpriority</option>
        <option value="Moderatepriority">Lowpriority</option>
     </select>
     {error?.priority && <p>Priority is required</p>}

     


     <div>
        <p>Checklist</p>
        {checklist.map((item, index) => (
          <div key={index}>
            <input type="text"
             value={item.name} 
             onChange={(e) => handleChecklistChange(index, e.target.value)}/>

             <input type="checkbox"
             checked={item.completed}
             onChange={(e) => handleChecklistChange(index, e.target.checked, true)}
             />
          </div>  
        ))}

        <button onClick={addChecklist}>+ Add checklist item</button>
        <p>{checklist.filter(item => item.completed).length}/{checklist.length}</p>
     </div>

     <input type="date"
     value={dueDate} 
     onChange={(e) => setDueDate(e.target.value)}/>
     {error?.dueDate && <p>Due date is required</p>}

     <button onClick={handelSubmit}>Save</button>
     <button>Cancel</button>
    </div>
  )
}
