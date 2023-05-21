import React, { useMemo, useState } from 'react';
import './DateColumn.css';

const DateColumn = ({ fullDate, inventory }) => {
	const categories = ["Bags", "Belts", "Books", "Dresses", "Hats",
		"Households", "Jackets", "Long-Sleeves", "Pants", "Jewelry",
		"Supplies", "Shirts", "Shoes", "Shorts", "Sunglasses", "Sweaters",
		"Tanks", "Ties", "Misc"];
	
	const inputValues = {};
	for (let i = 0; i < categories.length; i++) {{
		if (inventory) {
			inputValues[categories[i]] = inventory[fullDate.getDay() - 1][i].quantity;
		
		} else {
			inputValues[categories[i]] = "0";
		}
		
	}};

	console.log(inputValues);

	const [input, setInput] = useState(inputValues)
	const days = useMemo(() => {
		return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
	}, []);

	// const [input, setInput] = useState(false);

	

	const keyPressed = (e) => {
		if (e.key === 'Enter') {
			console.log("Enter");
			// update 
			setInput(!input);
		}
		else if (e.key === 'Escape') {
			console.log("Escape");
			// do not update
			setInput(!input);
		}
	};

	if (!inventory)
		return (<></>)
	else if (input)
		return (
			<div className='date-container'
				onKeyDown={(e) => { keyPressed(e)}}>
				<h3>{fullDate.getDate()}</h3>
				<h3>{days[fullDate.getDay() - 1]}</h3>

				{categories.map((cat, i) => {
					return <div className="category">
						<input className="category" type="number"
							placeholder={inventory[fullDate.getDay() - 1][i].quantity || "0"}
							min="0"
							max="99" 
							/>
						{/* onClick={() => setInput(!input)} /> */}
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
					return <div className="category category2">
						<h4 className="value" onClick={() => setInput(!input)} >
							{inventory[fullDate.getDay() - 1][i].quantity}
						</h4>
					</div>;
				})}
			</div>
		)
}
export default DateColumn;