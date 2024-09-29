import React, {useState} from 'react';
import LoginPage from "./pages/LoginPage.jsx";
import RoomPage from "./pages/RoomPage.jsx";
import ChatPage from "./pages/ChatPage.jsx";


const App = () => {

    const [isAuth, setIsAuth] = useState(localStorage.getItem("token") || false);
    const [room, setRoom] = useState(null)
    const [user, setUser] = useState(null)

    if (!isAuth) return <LoginPage setUser={setUser} setIsAuth={setIsAuth}/>

    return (
        <div className="container">

            {
                room
                    ? <ChatPage room={room} setRoom={setRoom}/>
                    : <RoomPage setIsAuth={setIsAuth} setRoom={setRoom}/>
            }

        </div>
    );
};

export default App;
