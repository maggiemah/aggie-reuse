import React, { useMemo } from 'react';
import './DateColumn.css';

const DateColumn = ({fullDate}) => {
	const days = useMemo(() => {
		return ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
	}, []);
	// const months = useMemo(() => {
    // 	return ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	// }, []);

	const categories = ["Bags", "Belts", "Books", "Dresses", "Hats",
	"Households", "Jackets", "Long-Sleeves", "Pants", "Jewelry",
	"Supplies", "Shirts", "Shoes", "Shorts", "Sunglasses", "Sweaters",
	"Tanks", "Ties", "Misc"];

	return (
		<div className='date-container'>
			<h3>{fullDate.getDate()}</h3>
			<h3>{days[fullDate.getDay()-1]}</h3>

			{categories.map((cat, i) => {
                return <div className="category">
					<button>-</button>
					<h4>0</h4>
					<button>+</button>
				</div>;
            })}
        </div>
	)
}
export default DateColumn;