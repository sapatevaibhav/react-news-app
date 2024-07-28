import React, { Component } from "react";
import Navbar from "./components/Navbar";
import NewsComponent from "./components/NewsComponent";

export default class App extends Component {
  // name = "Vaibhav";
  render() {
    // let a = "Sapate";
    return (
      <div>
        {/* Hello there {this.name + " " + a} */}
        <Navbar />
        <NewsComponent pageSize={12} />
      </div>
    );
  }
}
