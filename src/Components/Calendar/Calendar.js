import "./Calendar.css";
import months from "../Functions/Months";
import ChangeMonth from "../Functions/ChangeMonth";
import MonthDays from "../Functions/MonthDays";
import getDate from "../Functions/GetDate";
import textDate from "../Functions/TextDate";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useEffect } from "react";

const Calendar = (props) => {
    const {todaydate, setTodaydate} = props;
    const [monthDays, setMonthDays] = useState([])
    const [viewForm, setViewForm] = useState(false)
    const [eventDate, setEventDate] = useState([])
    const [eventTitle, setEventTitle] = useState("")
    const [hour, setEventHour] = useState("")
    const [minute, setEventMinute] = useState("")
    const [eventDescription, setEventDescription] = useState("")

    useEffect(() => {setMonthDays(MonthDays(todaydate))}, [todaydate])

    return (
        <div className="container">
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
                {monthDays.map((elem, index) => {
                    return (
                        <div key={index} className="week-details">
                            {elem.map((elem2, index2) => {
                                return <span key={index2} className="daycal"
                                onClick={() => {setViewForm(true); setEventDate([elem2, todaydate[1], todaydate[2]])}}>
                                    {elem2}</span>
                            })}
                        </div>
                    )
                })}
            </div>
            {viewForm && 
                <form className="event-form">
                    <div className="form-title">
                        <span>Create an event for {textDate(eventDate)}</span>
                    </div>
                    <label for="event-title" className="event-label">Event title</label>
                    <input type="text" id="event-title" placeholder="Event's title"
                    value={eventTitle} className="event-title"></input>
                </form>
            }
        </div>
    )
}

export default Calendar