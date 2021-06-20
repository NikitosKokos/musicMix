import React from 'react';
import s from './style.scss';

const Test = () => {
    const [count, setCount] = React.useState(0);
    return (
        <div>
            <button className={s.btn} onClick={() => setCount(count + 1)} >+</button>
            <div className={s.count}>{ count }</div>
            <button className={s.btn} onClick={() => setCount(count - 1)} >-</button>
        </div>
    )
}

export default Test;
