import "./App.css";

import { NavigationBar } from "./Components/TopNavigationBar/NavigationBar";

import { MainListing } from "./Components/MainListing/MainListing";

function App() {
  return (
    <div className="App">
      <NavigationBar />
      <MainListing />
    </div>
  );
}

export default App;
