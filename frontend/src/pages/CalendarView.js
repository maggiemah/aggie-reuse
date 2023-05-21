import { useCallback, useEffect, useRef, useState } from "react";
import Header from "../components/header/Header";
import Month from "../components/calendar/month/Month"

const CalendarView = () => {
	const [inventory, setInventory] = useState(null); // array of inventory data for specified dates

	const getDefaultDateRange = useCallback(() => {
		let newDate = new Date();
		// let day = newDate.getDay();
		// let date = newDate.getDate();
		// let month = newDate.getMonth() + 1;
		// let year = newDate.getFullYear();

		let firstDate = new Date();
		firstDate.setDate(newDate.getDate() - 5);
		let day = firstDate.getDay();
		let date = firstDate.getDate();
		let month = firstDate.getMonth() + 1;
		let year = firstDate.getFullYear();
	})

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

	let newDate = new Date();
	// let day = newDate.getDay();
	// let date = newDate.getDate();
	// let month = newDate.getMonth() + 1;
	// let year = newDate.getFullYear();

	let firstDate = new Date();
	firstDate.setDate(newDate.getDate() - 5);

	let day = firstDate.getDay();
	let date = firstDate.getDate();
	// let month = firstDate.getMonth() + 1;
	// let year = firstDate.getFullYear();
	let month = 5;
	let year = 2023;


	return (
		<><Header />
		<Month month_value={month} year={year}/>
		<div className="calendar-view">
			<h2>hi</h2>
			<>{year}-{month < 10 ? `0${month}` : ` ${month}`}-{date}, Day {day}</>

		</div></>
	)
}

export default CalendarView