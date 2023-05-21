import React, { useMemo } from 'react';
import './DateColumn.css';

const DateColumn = ({fullDate}) => {
	const days = useMemo(() => {
		return ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
	}, []);
	const months = useMemo(() => {
    	return ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	}, []);

	return (
		<div className='date-container'>
			<h3>{days[fullDate.getDay()-1]}</h3>
			<h3>{months[fullDate.getMonth()]} {fullDate.getDate()}, {fullDate.getYear()}</h3>
        </div>
	)
}
export default DateColumn;