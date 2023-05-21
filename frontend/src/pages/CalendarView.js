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

	useEffect(() => {
		const fetchInventory = async (startDate) => {
			const month = startDate.getMonth();
			const date = startDate.getDate();
			let response;
			try {
				response = await fetch(`http://localhost:3000/getitems/${month + 1}%2F${date}_Items`, {
					method: 'GET',
				});
			}
			catch (err) {
				console.log(err);
			}
			console.log(response);
			const json = await response.json();
			console.log(json);
		}

		fetchInventory(new Date());
	}, []);

	useEffect(() => {
		const updateInventory = async (fullDate) => {
			const month = fullDate.getMonth();
			const date = fullDate.getDate();
			let response;
			try {
				response = await fetch(`http://localhost:3000/updateitem/${month + 1}%2F${date}_Items`, {
					method: 'PUT',

				});
			}
			catch (err) {
				console.log(err);
			}
			console.log(response);
			const json = await response.json();
			console.log(json);
		}

		updateInventory(new Date());
	}, []);


	// const

	const changeView = () => {

		console.log("clicked");
	};


	// // initialize page
	// useEffect(() => {
	// 	firstDate.setDate(firstDate.getDate() - firstDate.getDay() + 1);
	// 	const fetchInventory = async (_date) => {
	// 		const month = _date.getMonth() + 1;
	// 		const date = _date.getDate();
	// 		const response = await fetch(`http://localhost:3000//getitems/${month}%2F${date}_Items`);
	// 		const json = await response.json();

	// 		const dummyData = [{
	// 			id: 1,
	// 			name: "Bags",
	// 			quantity: 5,
	// 			price: 0,
	// 			supplier: "N/A"
	// 		}, {
	// 			id: 2,
	// 			name: "Belts",
	// 			quantity: 2,
	// 			price: 0,
	// 			supplier: "N/A"
	// 		}];

	// 		if (response.ok) {
	// 			setInventory(json);
	// 		} else {
	// 			setInventory(dummyData);
	// 			console.log(inventory);
	// 			console.log("heelo");
	// 		}
	// 	}
	// 	fetchInventory(new Date());
	// 	// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, []);


	// let firstDate = new Date();
	firstDate.setDate(firstDate.getDate() - firstDate.getDay() + 1);

	let day = firstDate.getDay();
	let date = firstDate.getDate();
	// let month = firstDate.getMonth() + 1;
	// let year = firstDate.getFullYear();
	let month = 5;
	let year = 2023;
	const categories = useMemo(() => {
		return ["Bags", "Belts", "Books", "Dresses", "Hats",
			"Households", "Jackets", "Long-Sleeves", "Pants", "Jewelry",
			"Supplies", "Shirts", "Shoes", "Shorts", "Sunglasses", "Sweaters",
			"Tanks", "Ties", "Misc"]
	}, []);

	let cat_arr = [];
	for (let i = 0; i < categories.length; i++) {
		cat_arr.push(
			<div className="category-column">
				{/* <hr></hr> */}
				<p>{categories[i]}</p>
			</div>
		);
	}
	return (
		<><Header />
			<div className="test"></div>
			<div className="calendar-view">
				<div className={"month-picker"}>
					<h1 id='left-month-button' onClick={changeWeek(firstDate, false)}>&lt;</h1>
					<h1>{months[month - 1]} {year}</h1>
					<h1 id='right-month-button' onClick={changeWeek(firstDate, true)}>&gt;</h1>
				</div>
				<div className="calendar-with-button">
					<div className="calendar-grid">
						<button className="button" onClick={() => changeView()}>
							<img src={pencil} alt='pencil' />
							Cancel
						</button>
						{cat_arr}
					</div>
					<WeekRange startDate={firstDate} />
				</div>
			</div>
		</>
	)
}

export default CalendarView