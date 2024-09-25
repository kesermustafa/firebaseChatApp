import React, {useState} from 'react';
import {signOut} from 'firebase/auth';
import {auth} from "../firebase/index.js";

const RoomPage = ({setIsAuth, setRoom, user}) => {

    const logout = () => {
        setIsAuth(false);
        localStorage.removeItem("token");
        signOut(auth); // firebase e cikis yapildigini bildir
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const room = e.target[0].value.toLowerCase();
        setRoom(room);
    }


    return (

        <form onSubmit={handleSubmit} className="room-page">
            <h2>Chat Odasi</h2>
            <p>Merhaba <br/> <strong>{user?.displayName ? user?.displayName : null}</strong> <br/>Hangi Odaya Giris
                Yapacaksiniz?</p>

            <input type="text" placeholder="or:haftasonu"/>

            <button type='submit'>Odaya Gir</button>
            <button type='button' onClick={logout}>Cikis Yap</button>
        </form>
    );
};

export default RoomPage;
