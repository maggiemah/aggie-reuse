import React from 'react';
import './DateColumn.css';

const DateColumn = ({fullDate}) => {
	return (
		<div className='date-container'>
			<h3>{fullDate.getDate()}</h3>
			<h3>{fullDate.getDay()}</h3>
        </div>
	)
}
export default DateColumn;