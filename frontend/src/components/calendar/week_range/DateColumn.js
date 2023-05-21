import React, { useCallback, useMemo, useState } from 'react';
import './DateColumn.css';

const DateColumn = ({ fullDate, inventory }) => {
	const categories = ["Bags", "Belts", "Books", "Dresses", "Hats",
		"Households", "Jackets", "Long-Sleeves", "Pants", "Jewelry",
		"Supplies", "Shirts", "Shoes", "Shorts", "Sunglasses", "Sweaters",
		"Tanks", "Ties", "Misc"];

	const getInventoryData = useCallback(() => {
		const inputValues = {};
		for (let i = 0; i < categories.length; i++) {
			if (inventory) {
				inputValues[categories[i]] = inventory[fullDate.getDay() - 1][i].quantity;
			} else {
				inputValues[categories[i]] = "0";
			}
		};
		return inputValues;
	}, []);


	const [input, setInput] = useState(false);
	const [data, setData] = useState(getCurrentData(false));
	const days = useMemo(() => {
		return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
	}, []);

	const getCurrentData = useCallback((changed) => {
		if (!changed) {
			const inputValues = getInventoryData();
			setData(inputValues);
			return inputValues
		}
		console.log(data)
		return data;
	}, []);
	
	const keyPressed = (e) => {
		if (e.key === 'Enter') {
			console.log("Enter");
			setInput(!input);
			setData(getCurrentData(true));
		}
		else if (e.key === 'Escape') {
			console.log("Escape");
			setInput(!input);
			setData(getCurrentData(false));
		}
	};

	if (!inventory)
		return (<></>)
	else if (input)
		return (
			<div className='date-container'
				onKeyDown={(e) => { keyPressed(e) }}>
				<h3>{fullDate.getDate()}</h3>
				<h3>{days[fullDate.getDay() - 1]}</h3>

				{categories.map((cat, i) => {
					return <div className="category">
						<input className="category" type="number"
							placeholder={inventory[fullDate.getDay() - 1][i].quantity || "0"}
							min="0"
							max="99"
							onChange={(ele) => data[categories[i]] = ele.target.value}
						/>
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
							{data[categories[i]]}
						</h4>
					</div>;
				})}
			</div>
		)
}
export default DateColumn;