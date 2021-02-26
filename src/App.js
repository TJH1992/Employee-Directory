import React from "react";
import Main from "./Main";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Wrapper from "./components/Wrapper";

function App() {
  return (
    <div className="App">
      <Wrapper>
      <Header />
      <Main />
      <Footer />
      </Wrapper>
    </div>
  );
}

export default App;