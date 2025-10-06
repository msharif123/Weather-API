import Favorite from "./components/Favorite/Favorite";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
// import Search from "./components/Search/Search";
import Weather from "./components/weather/Weather";
import './App.css'; // Make sure this is imported

const App = () => {
  return (
    <div className="app-container">
      <Header />
      {/* <Search /> */}
      <main className="main-content">
        <Weather />
        <Favorite />
      </main>
      <Footer />
    </div>
  );
};

export default App;
