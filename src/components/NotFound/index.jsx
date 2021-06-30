import React from 'react';
import { Link } from 'react-router-dom';
import './style.scss'

const NotFound = () => {

    const hoverBtn = e => {
        const x = e.pageX - e.target.offsetLeft;
        const y = e.pageY - e.target.offsetTop;

        e.target.style.setProperty('--x',`${x}px`);
        e.target.style.setProperty('--y',`${y}px`);
    }

    return (
        <div className='notFound'>
            <div className="notFound__content">
                <h1 className="notFound__title">404</h1>
                <div className="notFound__descr">Page not found, please go back to home page</div>
                <Link to='/' onMouseMove={hoverBtn} className='notFound__btn'><span>Home</span></Link>
            </div>
        </div>
    )
}

export default NotFound;
