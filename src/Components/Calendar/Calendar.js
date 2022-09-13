import "./Calendar.css";
import months from "../Functions/Months";
import ChangeMonth from "../Functions/ChangeMonth";
import MonthDays from "../Functions/MonthDays";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useEffect } from "react";

const Calendar = (props) => {
    const {todaydate, setTodaydate} = props;
    const [monthDays, setMonthDays] = useState([])
    useEffect(() => {setMonthDays(MonthDays(todaydate))}, [todaydate])

    return (
        <div className="calendar">
            <div className="month">
                <FontAwesomeIcon icon="arrow-left" className="arrow" onClick={() => {
                    setTodaydate(ChangeMonth(todaydate, "decrease"))}}></FontAwesomeIcon>
                <span>{months(todaydate[1])}</span>
                <FontAwesomeIcon icon="arrow-right" className="arrow" onClick={() => {
                    setTodaydate(ChangeMonth(todaydate, "increase"))}}></FontAwesomeIcon>
            </div>
            <div className="days">
                <span className="dayshort">S</span>
                <span className="dayshort">M</span>
                <span className="dayshort">T</span>
                <span className="dayshort">W</span>
                <span className="dayshort">T</span>
                <span className="dayshort">F</span>
                <span className="dayshort">S</span>
            </div>
        </div>
    )
}

export default Calendar