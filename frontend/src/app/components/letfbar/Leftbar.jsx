import React from 'react';
import "./leftbar.css";
import { NavLink} from 'react-router-dom';
function Leftbar(){

    return(
        <nav className="leftPanel">
            <NavLink to='/' className= "sidebar-item"
            >
                <indicator>
                <img src="/assets/home.svg" alt="Home" />
                    <span >Home</span>
                </indicator>
                    
                
            </NavLink>
            
            <div className="sidebar-item">
            <indicator>

                <img src="/assets/search.svg" alt="Search" />
                <span>Search</span>
                </indicator>

            </div>
            <NavLink to='/post' className="sidebar-item">
            <indicator>

                <img src="/assets/create.svg" alt="Create Post" />
                <span>Post</span>
                </indicator>

            </NavLink>
            <NavLink to='/assistant' className="sidebar-item">
            <indicator>
                <img src="/assets/assistant.svg" alt="Assistant" />
                <span>Assistant</span>
                </indicator>    
            </NavLink>
            <NavLink to='/profile' className="sidebar-item">
            <indicator>

                <img src="/assets/user.svg" alt="Profile" />
                <span>Profile</span>
                </indicator>
    
            </NavLink>
            <div className="sidebar-item">
            <indicator>

                <img src="/assets/logout.svg" alt="Logout" />
                <span>Logout</span>
                </indicator>
            </div>
        </nav>
        
    );
}

export default Leftbar;
