import React from 'react';
import {auth} from "../firebase/index.js";

const Messages = ({data}) => {


    if(auth.currentUser?.uid === data.author.id){
        return (
            <div className='msg-user'>
                <img src={auth?.currentUser?.photoURL} alt=""/>
                <p >{data.text}</p>
            </div>

        )
    }

    return (
        <div className='msg-other'>
          <img src={data?.author?.photo} alt=""/>

            <div className='user-info'>
                <p>{data.author.name}</p>
                <p className='msg-text'>{data.text}</p>
            </div>


        </div>
    );
};

export default Messages;
