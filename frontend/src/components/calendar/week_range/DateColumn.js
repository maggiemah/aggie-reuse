import React, { useMemo, useState } from 'react';
import './DateColumn.css';

const DateColumn = ({ fullDate }) => {
	const days = useMemo(() => {
		return ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
	}, []);
	const [input, setInput] = useState(false);
	// const months = useMemo(() => {
	// 	return ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	// }, []);

	const categories = ["Bags", "Belts", "Books", "Dresses", "Hats",
		"Households", "Jackets", "Long-Sleeves", "Pants", "Jewelry",
		"Supplies", "Shirts", "Shoes", "Shorts", "Sunglasses", "Sweaters",
		"Tanks", "Ties", "Misc"];

	if (input)
		return (
			<div className='date-container'>
				<h3>{fullDate.getDate()}</h3>
				<h3>{days[fullDate.getDay() - 1]}</h3>

				{categories.map((cat, i) => {
					return <div className="category">
						{/* <button>-</button> */}
						<input className="value" type="number"
							placeholder="0"
							min="0"
							max="99"
							onkeydown={() => setInput(!input)} />
						{/* <button>+</button> */}
					</div>;
				})}
			</div>
		)
	else
		return (
			<div className='date-container'>
				<h3>{fullDate.getDate()}</h3>
				<h3>{days[fullDate.getDay() - 1]}</h3>

				{categories.map((cat, i) => {
					return <div className="category">
						<h4 className="value" onClick={() => setInput(!input)} >0</h4>
					</div>;
				})}
			</div>
		)
}
export default DateColumn;