import React, { useEffect, useRef, useState } from 'react';
import classes from './Header.module.css';

const Header = () => {

    const [theme, setTheme] = useState('light');
    
    const checkbox = useRef();

    const changeTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light')
    }

    useEffect( () => {
        const root = document.querySelector(':root');
        const components = ['body-background', 'component-background', 'text-background', 'card-background'];

        components.forEach( component => {
            root.style.setProperty(`--${component}-default`, `var(--${component}-${theme})`)
        })
    }, [theme])

    return (
        <header className={classes.header}>
            <div>
                <h1>To Do List</h1>
            </div>
            <div className={classes.themeChange}>
                <input ref={checkbox} type="checkbox" id="checkbox" className={classes.checkbox} onChange={changeTheme}/>
                <label htmlFor="checkbox" className={classes.label}> 
                    <i className='fas fa-moon' style={{"color": "#f1c40f"}}/>
                    <i className='fas fa-sun' style={{"color": "#f39c12"}}/>
                    <div className={classes.ball}></div>
                </label>
            </div>
        </header>
    );
};

export default Header;