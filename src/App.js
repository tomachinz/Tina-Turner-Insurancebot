import React from "react";
import "./styles/App.css";
import Header from "./components/Header.js";
// import ChatBox from "./components/Chatbox.js";
import Insurancebot from "./components/Insurancebot.js";
import Footer from "./components/Footer.js";

function App() {
  return (
    <div className="App">
      <Header />
      <Insurancebot />
      {/* <ChatBox /> */}
      <Footer />
    </div>
  );
}

export default App;
