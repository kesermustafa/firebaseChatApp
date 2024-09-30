import React, {useEffect, useState} from 'react';
import LoginPage from "./pages/LoginPage.jsx";
import RoomPage from "./pages/RoomPage.jsx";
import ChatPage from "./pages/ChatPage.jsx";


const App = () => {

    const [isAuth, setIsAuth] = useState(localStorage.getItem("token") || false);
    const [room, setRoom] = useState(null)
    const [user, setUser] = useState(null)

    useEffect(() => {
        const savedRoom = localStorage.getItem('chatRoom');
        if (savedRoom) {
            setRoom(savedRoom); // Eğer oda varsa set edilir
        } else {
            setRoom(null); // Oda yoksa yönlendirilir
        }
    }, [room]);


    if (!isAuth){
        localStorage.removeItem("chatRoom");
        return <LoginPage setUser={setUser} setIsAuth={setIsAuth}/>
    }

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
