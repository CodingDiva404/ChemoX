import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/HomePage.jsx';
import PerodicTable from './pages/PeriodicTable.jsx';
import Curriculum from "./features/curriculum/Curriculum.jsx";
import ChapterDetail from "./features/curriculum/ChapterDetail.jsx";
import Layout from "./components/layout/Layout.jsx";
import Library from './features/library/Library.jsx';


function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/perodic-table' element={<PerodicTable />} />
          <Route path='/curriculum' element={<Curriculum />} />
          <Route path="/chapter/:id" element={<ChapterDetail />} />
          <Route path="/library" element={<Library />} />
          <Route path="/library/fundamentals" element={<div>Fundamentals Page</div>} />
          <Route path="/library/reactions" element={<div>Reactions Page</div>} />
          <Route path="/library/measurements" element={<div>Measurements Page</div>} />
          <Route path="/library/revision" element={<div>Revision Page</div>} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
