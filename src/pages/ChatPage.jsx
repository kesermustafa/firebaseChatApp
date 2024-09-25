import React from 'react';
import {auth} from "../firebase/index.js";

const ChatPage = ({room, setRoom}) => {

    return (
        <div className="chat-page">
            <header>
                <p>{auth.currentUser.displayName}</p>
                <p>{room}</p>
                <button onClick={()=> setRoom(null)}>Farkli Oda</button>
            </header>

            <main>mesajlar</main>

            <form className='message-form'>
                <input type="text" placeholder='mesajinizi yaziniz'/>
                <button type='submit'>Gonder</button>
            </form>
        </div>
    );
};

export default ChatPage;
