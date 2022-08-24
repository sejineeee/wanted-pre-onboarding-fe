import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/SignUp";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Header from "./components/Header";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/todo" element={<Home />} />
          <Route path="/" element={<Login />} />
          <Route path="/sign-up" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
