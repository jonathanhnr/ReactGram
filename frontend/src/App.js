import './App.css';

//ROUTER
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

//PAGES
import Home from './pages/Home/Home';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';

//HOOKS
import { useAuth } from './hooks/useAuth';

//COMPONENTS
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import EditProfile from './pages/EditiProfile/EditProfile';
import Profile from './pages/Profile/Profile';
import Photo from './pages/Photo/Photo';
import Search from './pages/Search/Search';

function App() {
  const { loading } = useAuth();
  if (loading) {
    return <p>carregando...</p>;
  }

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<EditProfile />} />
            <Route path="/users/:id" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/search" element={<Search />} />
            <Route path="/photos/:id" element={<Photo />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
