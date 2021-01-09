import React from 'react' ;
import classes from './SidebarItem.module.css';

export const sidebarItem=(props)=> {
//sideBarItem stateles componnet
//gets contact names as props from Sidebar component
//and displays them
//css modules are used for styling

        return (
                    <div className={classes.contactName} 
                         onClick={()=>props.selectChat(props.index)}
                                                                        >
                         {props.contactName} 
		    </div>
        )
}

export default sidebarItem ;