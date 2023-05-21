import React from 'react';
import DateColumn from './DateColumn';
import './WeekRange.css';

// pass in the sunday Date object
const WeekRange = ({ startDate, inventory }) => {
	const arr = [0, 1, 2, 3, 4]

	return (
		<div className='week-range'>
            {arr.map((i) => {
                let newDate = new Date();
                newDate.setDate(startDate.getDate() + i);
                return <div className='date-column' key={i.uniqueID}>
                    <DateColumn fullDate={newDate} inventory={inventory} />
                </div>;
            })}
		</div>
	)
}
export default WeekRange;