export default function ValidateTask(title, priority, assignee, checklist, dueDate) {
    let valid = true;
    let invalid = {
      title: false,
      priority: false,
      assignee: false,
      checklist: false,
      dueDate: false
    };
  
    if (!title || !priority || !assignee || !dueDate) {
      valid = false;
      invalid = {
        title: !title,
        priority: !priority,
        assignee: !assignee,
        dueDate: !dueDate,
        checklist: checklist.length === 0
      };
    }
  
    return {
      valid,
      invalid
    };
  }
  