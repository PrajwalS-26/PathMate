import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<h1 className="text-3xl font-bold text-center mt-10">Welcome to PathMate</h1>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
