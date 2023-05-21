import { useCallback, useEffect, useRef, useState } from "react";
import Header from "../components/header/Header";
import Month from "../components/calendar/month/Month"
import WeekRange from "../components/calendar/week_range/WeekRange"
import "./CalendarView.css"

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
		const fetchInventory = async (_date) => {
			const month = _date.getMonth() + 1;
			const date = _date.getDate();
			const response = await fetch(`http://localhost:3000//getitems/${month}%2F${date}_Items`);
			const json = await response.json();

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

			if(response.ok) {
				setInventory(json);
			} else {
			setInventory(dummyData);
			console.log(inventory);
			console.log("heelo");
			}
		}
		fetchInventory(new Date());
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	let newDate = new Date();
	// let day = newDate.getDay();
	// let date = newDate.getDate();
	// let month = newDate.getMonth() + 1;
	// let year = newDate.getFullYear();

	let firstDate = new Date();
	firstDate.setDate(newDate.getDate() - newDate.getDay() + 1);

	let day = firstDate.getDay();
	let date = firstDate.getDate();
	// let month = firstDate.getMonth() + 1;
	// let year = firstDate.getFullYear();
	let month = 5;
	let year = 2023;


	return (
		<><Header />
		<div className="calendar-view">
			<Month month_value={month} year={year}/>
			<WeekRange startDate={firstDate}/>
			<h2>hi</h2>
			<>{year}-{month < 10 ? `0${month}` : ` ${month}`}-{date}, Day {day}</>
		</div></>
	)
}

export default CalendarView