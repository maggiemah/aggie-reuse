import React from 'react';
import './Month.css';

const Month = (month_value, year) => {
	return (
		<div class="month-box">
            <h1 >&lt;</h1>
            <h1>{month_value}</h1>
            <h1>{year}</h1>
            <h1>&gt;</h1>
        </div>
	)
}
export default Month;