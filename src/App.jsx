import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { QuizProvider } from "./context/QuizContext";
import Home from './components/Home.jsx';
import Quiz from "./components/Quiz";
import Results from "./components/Results";

function App() {
  return (
    <QuizProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/results" element={<Results />} />
        </Routes>
      </Router>
    </QuizProvider>
  );
}



export default App;
