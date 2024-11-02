import { useNavigate } from "react-router-dom";
import styles from "./Sidebar.module.css"
import Logout from '../assets/Logout.png'
import codesandbox from "../assets/codesandbox.png"
import database from "../assets/database.png"
import layout from "../assets/layout.png"
import setting from "../assets/settings.png"
import { useState } from "react";

export default function Sideebar() {
    const [showLogoutModal, setShowLogoutModal] = useState(false);
  const isLoggedIn = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    setShowLogoutModal(true); 
  };

  const confirmLogout = () => {
    localStorage.removeItem("token");
    setShowLogoutModal(false);
    navigate("/");
  };

  const cancelLogout = () => {
    setShowLogoutModal(false); 
  };

    const board=()=>{
        navigate("/board")
    }

    const analytics=()=>{
        navigate("/analytics")
    }

    const settings=()=>{
        navigate("/settings")
    }
    return (
     
        <aside >
          <div className={styles.container}>
            {isLoggedIn ? <> <div className={styles.pro}>
                <img src={codesandbox} alt="" />
                <span>Pro Manage</span>
            </div>
             <div className={styles.board1}>
                <img src={layout} alt="" />
                <button onClick={board} className={styles.btn}>Board</button></div>
             <div className={styles.board1}> 
               <img src={database} alt="" />
                <button onClick={analytics} className={styles.btn}>Analytics</button>
             </div>
             <div className={styles.board1}>
                <img src={setting} alt="" />
                <button onClick={settings} className={styles.btn}>Settings</button>
                </div>
               <div className={styles.board2}>
                <img src={Logout} alt="" />
                <button onClick={handleLogoutClick} className={styles.btn1}>Logout</button>
                </div> 
            </> : <p>Not logged in</p>}

            {showLogoutModal && (
          <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
              <h3>Are you sure you want to logout?</h3>
              <div className={styles.modalButtons}>
                <button onClick={confirmLogout} className={styles.confirmBtn}>
                  Logout
                </button>
                <button onClick={cancelLogout} className={styles.cancelBtn}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
            </div>
        </aside>
       
    )
}