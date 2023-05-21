import { useCallback, useEffect, useMemo, useState } from "react";
import Header from "../components/header/Header";
import WeekRange from "../components/calendar/week_range/WeekRange"
import pencil from "../assets/pencil.png";

import "./CalendarView.css"

const CalendarView = () => {
	const [inventory, setInventory] = useState(null); // array of inventory data for specified dates
	const [firstDate] = useState(new Date());
	const months = useMemo(() => {
    	return ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	}, []);

	const changeWeek = useCallback((fullDate, forward) => {
		const daysAdjusted = forward ? 7 : -7;
		fullDate.setDate(fullDate.getDate() + daysAdjusted);
	}, [])


	// initialize page
	useEffect(() => {
		firstDate.setDate(firstDate.getDate() - firstDate.getDay() + 1);
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


	// let firstDate = new Date();
	firstDate.setDate(firstDate.getDate() - firstDate.getDay() + 1);

	let day = firstDate.getDay();
	let date = firstDate.getDate();
	// let month = firstDate.getMonth() + 1;
	// let year = firstDate.getFullYear();
	let month = 5;
	let year = 2023;
	const categories = ["Bags", "Belts", "Books", "Dresses", "Hats", 
		"Households", "Jackets", "Long-Sleeves", "Pants", "Jewelry", 
		"Supplies", "Shirts", "Shoes", "Shorts", "Sunglasses", "Sweaters", 
		"Tanks", "Ties", "Misc"];

	let cat_arr = [];
	for (let i = 0; i < categories.length; i++) {
		cat_arr.push(
			<div className="category-column">
				<hr></hr>
				<p>{categories[i]}</p>
			</div>
		);
	}
	return (
		<><Header />
		<div className="calendar-view">
			<div class="month-box">
				<h1 id='left-month-button' onClick={changeWeek(firstDate, false)}>&lt;</h1>
				<h1>{months[month- 1]} {year}</h1>
				<h1 id='right-month-button' onClick={changeWeek(firstDate, true)}>&gt;</h1>
			</div>
			<WeekRange startDate={firstDate}/>
			{/* <h2>hi</h2>
			<>{year}-{month < 10 ? `0${month}` : ` ${month}`}-{date}, Day {day}</> */}
		</div>
		<button class="button">
			<img src={pencil} alt='pencil' />
			Add/Remove
		</button>
		{cat_arr}
		</>
	)
}

export default CalendarView