import { useEffect, useState } from "react";

const CalendarView = () => {
	const [inventory, setInventory] = useState(null); // array of inventory data for specified dates

	useEffect(() => {
		const fetchInventory = async (_dates) => {
			// const response = await fetch(`http://localhost:4000/api/inventory/${_dates}`);
			// const json = await response.json();

			const dummyData = [{
				id: 1,
				name: "Bags",
				quantity: 5,
				price: 0,
				supplier: "N/A"
			}, {
				id: 2,
				name: "Belts",
				quantity: 2,
				price: 0,
				supplier: "N/A"
			}];

			// if(response.ok) {
			// 	setInventory(json);
			// } else {
			setInventory(dummyData);
			console.log(dummyData);
			// }
		}
		fetchInventory('05_15_2023-05_19_2023');
	}, []);

	return (
		<div className="calendar-view">
			<h2>hi</h2>
		</div>
	)
}

export default CalendarView