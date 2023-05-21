import React from 'react';
import DateColumn from './DateColumn';
import './WeekRange.css';

// pass in the sunday Date object
const WeekRange = ({ startDate }) => {
	const arr = [0, 1, 2, 3, 4]
	// for (let i = 0; i < 5; i++) {
	// 	let newDate = new Date();
	// 	newDate.setDate(startDate.getDate() + i);
	// 	// console.log(newDate);
	// 	arr.push(
	// 		<div className='date-column'>
	// 			<DateColumn fullDate={newDate} />
	// 		</div>
	// 	);
	// }

	return (
		<div className='week-range'>
            {arr.map((i) => {
                let newDate = new Date();
                newDate.setDate(startDate.getDate() + i);
                return <div className='date-column' key={i.uniqueID}>
                    <DateColumn fullDate={newDate} />
                </div>;
            })}
		</div>
	)
}
export default WeekRange;