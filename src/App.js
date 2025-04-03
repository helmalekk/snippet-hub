import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import SnippetGenerator from './components/SnippetGenerator';
import PopularSnippets from './components/PopularSnippets';
import About from './components/About';
import Contact from './components/Contact';
import LoginPage from './components/LoginPage';
import PrivateRoute from './components/PrivateRoute';
import Footer from './components/Footer';
import Profile from './components/Profile';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <div className="App">
            <Navbar />
            <main className="main-content container">
              <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route 
                  path="/" 
                  element={
                    <PrivateRoute>
                      <SnippetGenerator />
                    </PrivateRoute>
                  } 
                />
                <Route path="/popular" element={<PopularSnippets />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route 
                  path="/profile" 
                  element={
                    <PrivateRoute>
                      <Profile />
                    </PrivateRoute>
                  } 
                />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
