

import Navbar from './component/Navbar';
import About from './component/About';
import Home from './component/Home';
import NoteState from './context/notes/NoteState';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './component/Login';
import Signup from './component/Signup';
import { useState } from 'react';
import Alert from './component/Alert';






function App() {
  const [alert, setalert] = useState(null)
  
  const showalert=(message,type)=>
  {
    setalert({
      mess:message,
      type:type
    })
    setTimeout(() => {
      setalert(null)
    }, 2000);

  }
  return (
    <>
   <NoteState>
    <Router>
      
    <Navbar/>
    <Alert alert={alert}/>
    <div className="container">
      <Routes>
        <Route exact path="/" element={<Home showalert={showalert} />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/login" element={<Login showalert={showalert} />} />
        <Route exact path="/signup" element={<Signup showalert={showalert} />} />
       
      </Routes>
      </div>
    </Router>
    </NoteState>
    
    </>
  );
}

export default App;
