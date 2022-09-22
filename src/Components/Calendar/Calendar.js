import "./Calendar.css";
import months from "../Functions/Months";
import ChangeMonth from "../Functions/ChangeMonth";
import MonthDays from "../Functions/MonthDays";
import DateCompute from "../Functions/DateCompute";
import textDate from "../Functions/TextDate";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useEffect } from "react";
import axios from "axios";

const Calendar = (props) => {
    const {todaydate, setTodaydate, token} = props;
    const [monthDays, setMonthDays] = useState([])
    const [viewForm, setViewForm] = useState(false)
    const [eventDate, setEventDate] = useState([])
    const [eventTitle, setEventTitle] = useState("")
    const [eventHour, setEventHour] = useState("")
    const [eventMinute, setEventMinute] = useState("")
    const [eventDescription, setEventDescription] = useState("")
    const [eventResponse, setEventResponse] = useState("")
    const [eventStatus, setEventStatus] = useState("pending")

    useEffect(() => {setMonthDays(MonthDays(todaydate))}, [todaydate])

    const handleSubmit = async(event) => {
        event.preventDefault()
        try {
            const treatedDate = DateCompute(eventDate, eventHour, eventMinute)
            if(eventTitle.length < 3) {
                setEventStatus("error")
                setEventResponse("Please provide a title that is at least 3 caracters long")
            } else {
                const response = await axios.post("https://calendar-reacteur.herokuapp.com/create-event", {
                    token: token, date: treatedDate, title: eventTitle, description: eventDescription
                })
                setEventStatus("created")
            }
        } catch (error) {
            setEventStatus("error")
            setEventResponse(error.response.data.message)
        }
    }

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
                                onClick={() => {setViewForm(true); setEventDate([elem2, todaydate[1], todaydate[2]]);
                                setEventStatus("pending")}}>
                                    {elem2}</span>
                            })}
                        </div>
                    )
                })}
            </div>
            {viewForm && 
                <form className="event-form" onSubmit={handleSubmit}>
                    {eventStatus === "created" ?
                        <div className="modaltitlecontaintwo">
                            <span className="modal-title">Event created with success!</span>
                        </div>
                    :
                    <>
                    <div className="form-title">
                        <span>Create an event for {textDate(eventDate)}</span>
                    </div>
                    <label htmlFor="event-title" className="event-label">Event title :</label>
                    <input type="text" id="event-title" placeholder="Event's title"
                    value={eventTitle} className="event-title" onChange={(e) => {
                        setEventTitle(e.target.value)
                    }}></input>
                    <span className="event-label">Event time :</span>
                    <div className="full-time">
                        <div className="num-contain">
                            <input type="number" placeholder="00" value={eventHour} min="0" max="23" step="1"
                            className="timer" onChange={(e) => {if(e.target.value >= 0) {if(e.target.value < 10) {
                                setEventHour("0" + e.target.value)} else {setEventHour(e.target.value)}}}}></input>
                        </div>
                        <span className="h">h</span>
                        <div className="num-contain">
                            <input type="number" placeholder="00" value={eventMinute} min="0" max="59" step="1"
                            className="timer" onChange={(e) => {if(e.target.value >= 0) {if(e.target.value < 10) {
                                setEventMinute("0" + e.target.value)} else {setEventMinute(e.target.value)}}}}></input>
                        </div>
                    </div>
                    <label htmlFor="event-title" className="event-label">Event description :</label>
                    <textarea id="event-title" placeholder="Event's description" rows="3"
                    value={eventDescription} className="event-desc" onChange={(e) => {
                        setEventDescription(e.target.value)
                    }}></textarea>
                    <div className="sumbit-div">
                        <button className="sumbit">Sumbit</button>
                    </div>
                    {eventStatus === "error" &&
                        <span className="create-error">{eventResponse}</span>
                    }
                    </>}
                </form>
            }
        </div>
    )
}

export default Calendar