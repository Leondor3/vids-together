import { Register } from './pages/Register';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { SignIn } from './pages/SignIn';
import { Room } from './pages/Room';
import { RoomList } from './pages/RoomList';

function App() {

  return (
    <main className='bg-zinc-950 h-screen'>
      <Router>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/room" element={<Room />} />
          <Route path="/room/:id" element={<RoomList />} />
        </Routes>
      </Router>
    </main>
  )
}

export default App
