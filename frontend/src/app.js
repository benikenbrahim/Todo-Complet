import { Route, Routes } from 'react-router-dom';
import { AuthenticationPage } from './pages/authenticationPage';
import { RegistrationPage } from './pages/registrationPage';
import { HomePage } from './pages/homePage';
import { AboutPage } from './pages/aboutPage';
import Dashboard from './pages/dashboard';
import {Profile} from './pages/Profile';
import {Help} from './pages/help';
<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js" integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r" crossorigin="anonymous"></script>

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/userCancel" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/authenticate" element={<AuthenticationPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/Dashboard" element={<Dashboard/>}/>
          <Route path="/Profile" element={<Profile/>}/>
          <Route path="/help" element= {<Help/>}/>
        </Routes>
      </header>

    </div>
  );
}

export default App;
