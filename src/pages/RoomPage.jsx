import React, {useEffect, useState} from 'react';
import {auth} from "../firebase/index.js";
import { signOut, onAuthStateChanged } from 'firebase/auth';

const RoomPage = ({setIsAuth, setRoom}) => {

    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser); // Kullanıcı oturum açmışsa bilgilerini set et
            } else {
                setUser(null); // Oturum yoksa null yap
                localStorage.removeItem('token');
            }
        });

        return () => {
            unsubscribe()
        }; // Bileşen unmount olduğunda dinleyiciyi temizle
    }, []);



    const logout = () => {
        setIsAuth(false);
        localStorage.removeItem("token");
        localStorage.removeItem("chatRoom");
        signOut(auth); // firebase e cikis yapildigini bildir
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const room = e.target[0].value.toLowerCase().trim();
        localStorage.setItem('chatRoom', room.toString());
        setRoom(room);
    }


    return (

        <form onSubmit={handleSubmit} className="room-page">
            <div>
                <img src="/chatLogo.png" alt=""/>
                <h2>Chat Odasi</h2>
            </div>
            <p>Merhaba <br/> <strong>{user && user.displayName}</strong> <br/>Hangi Odaya Giris
                Yapacaksiniz?</p>

            <input type="text" placeholder="or:haftasonu"/>

            <button type='submit'>Odaya Gir</button>
            <button type='button' onClick={logout}>Cikis Yap</button>
        </form>
    );
};

export default RoomPage;
