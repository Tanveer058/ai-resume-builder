import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';
import Preview from './pages/Preview';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import PageNotFound from './pages/PageNotFound';
import MyResumes from './pages/MyResumes';
import UpdateResume from './pages/UpdateResume';
import Footer from './components/Footer';
import About from './pages/About';
import CreateResume from './pages/CreateResume';


function App() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <BrowserRouter>
        <Navbar />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Routes>
            <Route path="/signup" element={
              <PublicRoute>
                <Signup />
              </PublicRoute>
            } />
            <Route path="/login" element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            } />
            <Route path="/" element={
              // {/* // <ProtectedRoute> */}
                <Home />
              // {/* </ProtectedRoute> */}
            } />
            <Route path="/preview" element={
              <ProtectedRoute>
                <Preview />
              </ProtectedRoute>
            } />
            <Route path="/my-resumes" element={
              <ProtectedRoute>
                <MyResumes />
              </ProtectedRoute>
            } />
            <Route path="/create-resume" element={
              <ProtectedRoute>
                <CreateResume />
              </ProtectedRoute>
            } />
            <Route path="/update-resume" element={
              <ProtectedRoute>
                <UpdateResume />
              </ProtectedRoute>
            } />
            <Route path="/about" element={
              // <ProtectedRoute>
                <About />
              // </ProtectedRoute>
            } />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
