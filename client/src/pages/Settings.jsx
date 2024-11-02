import Sideebar from "./Sideebar";
import { useState,useEffect } from "react";
import axios from "axios";
import styles from './Settings.module.css'
import { useNavigate } from "react-router-dom";
import { getUser,updateUser } from "../services/services";
import emIm from '../assets/icon.png'
import lock from '../assets/lock.png'
import person from '../assets/person.png'

export default function Settings() {

  const [user, setUser] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
      const fetchUser = async () => {
          try {
              const res = await getUser();
              setUser(res.data);
              setName(res.data.name);
              setEmail(res.data.email);
          } catch (error) {
              console.error('Error fetching user profile:', error);
          }
      };

      fetchUser();
  }, []);

  const handleUpdateUser = async (e) => {
      e.preventDefault();
      setMessage('');
      setError('');

      const updateData = {};

      // Ensure only one field is updated at a time
      if (name && name !== user.name) {
          updateData.name = name;
      }
      if (email && email !== user.email) {
          updateData.email = email;
      }
      if (newPassword && oldPassword) {
          updateData.newPassword = newPassword;
          updateData.oldPassword = oldPassword;
      }

      if (Object.keys(updateData).length === 0) {
          setError("Please make changes to either name, email, or password.");
          return;
      }

      try {
          const res = await updateUser(updateData);
          setMessage(res.data.message);
          
          if (res.data.message === "User updated successfully") {
              // Re-fetch the user details after update
              setUser((prevUser) => ({
                  ...prevUser,
                  name: name || prevUser.name,
                  email: email || prevUser.email,
              }));
              setOldPassword(''); // Clear password fields
              setNewPassword('');
          }
      } catch (error) {
          console.error('Error updating user:', error);
          setError(error.response?.data?.message || 'Failed to update user');
      }
  };

      

  return (
    <div className={styles.container}>
      <div>
    <Sideebar/>
    </div>
   

    <div className={styles.settings}>
            <h2>User Settings</h2>
            {message && <p style={{ color: 'green' }}>{message}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {user && (
                <form onSubmit={handleUpdateUser}>
                    <div className={styles.in1Container}>
                        <label></label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter name"
                            className={styles.name}
                        />
                        <img src={person} alt="" className={styles.icon}/>
                    </div>
                    <div className={styles.inputContainer}>
                        <label></label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter email"
                            className={styles.email}
                        />
                        <img src={emIm} alt="" className={styles.icon}/>
                    </div>
                    <div className={styles.in2Container}>
                        <label></label>
                        <input
                            type="password"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            placeholder="Enter oldpassword"
                            className={styles.pass}
                        />
                         <img src={lock} alt="" className={styles.icon}/>
                    </div>
                    <div className={styles.in3Container}>
                        <label></label>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="Enter newpassword"
                            className={styles.conpass}
                        />
                         <img src={lock} alt="" className={styles.icon}/>
                    </div>
                    <button type="submit" className={styles.update}>Update</button>
                </form>
            )}
        </div>        
 </div>

  )
    }
