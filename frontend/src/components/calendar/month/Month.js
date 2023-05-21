import React from 'react';
import './Month.css';

const Month = ({month_value, year}) => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  

	return (
		<div class="month-box">
            <h1 id='left-month-button'>&lt;</h1>
            <h1>{months[month_value - 1]} {year}</h1>
            <h1 id='right-month-button'>&gt;</h1>
        </div>
	)
}
export default Month;