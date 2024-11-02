import { useState } from "react";
import AddPeople from "../Component/Addpeople";
import addpeople from '../assets/addpeople.png'
import styles from './Naavbar.module.css'




export default function Naavbar({onFilterChange}) {
  const [isAddPeopleVisible, setIsAddPeopleVisible] = useState(false);

  const handleToggleForm = () => {
    setIsAddPeopleVisible((prev) => !prev);
  };

  const handleCloseForm = () => {
    setIsAddPeopleVisible(false); 

  }


  const formatDate = (date) => {
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();

    // Adding suffix to the date
    const daySuffix = (d) => {
      if (d > 3 && d < 21) return 'th'; // 11th to 20th get 'th'
      switch (d % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
      }
    };

    return `${day}${daySuffix(day)} ${month} ${year}`;
  };

  const currentDate = new Date();
  
  return (
  <nav>
<div>
  <p className={styles.greet}>Welcome!</p>
<p className={styles.date}>{formatDate(currentDate)}</p>
<div className={styles.peopleandopt}>
  <p className={styles.head}>Board</p>
  <img src={addpeople} alt="" onClick={handleToggleForm} /> <span className={styles.addp}>Add people</span>
  {isAddPeopleVisible && <AddPeople onClose={handleCloseForm} />}
  <div className={styles.option}>
  <select onChange={(e) => onFilterChange(e.target.value)} className={styles.option1}>
        <option value="select item">select</option>
        <option value="today">Today</option>
        <option value="thisWeek">This Week</option>
        <option value="thisMonth">This Month</option>
      </select>
</div>
</div>
</div>

  </nav>
  )
}
