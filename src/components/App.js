import React, { Component } from "react";
import { connect } from "react-redux";
import "../styles.css";

export class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>My Calendar</h1>
        <h2>Click on a day to add an event.</h2>
        <hr />
        <p>Welcome, {this.props.sample.name}</p>

        <hr />
        <div>Develop calendar here</div>

        <hr />
        <div>Develop form for event here</div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  sample: state.sample
});

export default connect(mapStateToProps)(App);
