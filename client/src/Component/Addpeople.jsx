// AddPeopleComponent.jsx
import  { useEffect, useState } from 'react';
import {getAssignee} from '../services/task';
const AddPeople = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);
  const[peopleDB,setPeopleDB]=useState([])

  
  useEffect(() => {
    async function fetchAssignees() {
      const res=await getAssignee();
      setPeopleDB(res.data)  
    } 
    fetchAssignees(); 
  },[])

  if(peopleDB.includes(email)){
      setIsConfirmationVisible(true)
  }
  
  const handleCancel = () => {
    onClose(); 
    setEmail('');
  };

  const handleAddPeople = () => {
    if (email.trim()) {
      setIsConfirmationVisible(true);
    }
  
  };

  const handleOkGotIt = () => {
    setIsConfirmationVisible(false);
    setEmail('');
    onClose(); 
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
      height:'284px',
      width:'600px'
    }}>
      <h3 style={{marginLeft:"160px",fontSize:"20px"}}>Add People To the board</h3>

      {!isConfirmationVisible ? (
        <div style={{display:"flex",flexDirection:'column',gap:'20px'}}>
          <input 
            type="email" 
            placeholder="Enter email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            style={{width:'500px',border:'1px solid gray',height:'38px',padding:"10px",fontSize:"16px",marginTop:'20px'}}
          />
          <div style={{display:"flex",gap:"80px",marginTop:"50px"}}>
          <button onClick={handleCancel} style={{width:"200px",height:"40px",borderRadius:"10px",marginLeft:"30px",border:"1px solid red",backgroundColor:"white",color:"red"}}>Cancel</button>
          <button onClick={handleAddPeople} style={{width:"200px",height:"40px",borderRadius:"10px",backgroundColor:"#17A2B8",color:"white",border:"none"}}>Add People</button>
          </div>
        </div>
      ) : (
        <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",marginTop:"50px"}}>
          <p> {email}</p>
          <button onClick={handleOkGotIt} style={{width:"200px",height:"40px",borderRadius:"10px",backgroundColor:"#17A2B8",color:"white",border:"none",marginTop:"20px"}}>OK, Got It</button>
        </div>
      )}
    </div>
  );
};

export default AddPeople;
