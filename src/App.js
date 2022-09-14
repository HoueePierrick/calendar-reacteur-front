import "./App.css";
import { useState, useEffect } from "react";
import Calendar from "./Components/Calendar/Calendar";
import { library } from '@fortawesome/fontawesome-svg-core';
import Header from "./Components/Header/Header";
import { faArrowRight, faArrowLeft, faXmark, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
library.add(faArrowRight, faArrowLeft, faXmark, faEye, faEyeSlash );

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();
today = dd + '/' + mm + '/' + yyyy;



function App() {
  const [todaydate, setTodaydate] = useState([dd, mm, yyyy])

  return (
    <>
      <Header></Header>
      <div className="App">
          <h1>My Calendar</h1>
          <Calendar todaydate={todaydate} setTodaydate={setTodaydate}></Calendar>
          <h2>Click on a day to add an event.</h2>
          <hr />
          <p>Welcome</p>
          <hr />
          <div>Develop calendar here</div>

          <hr />
          <div>Develop form for event here</div>
      </div>
    </>
  );
}

export default App;