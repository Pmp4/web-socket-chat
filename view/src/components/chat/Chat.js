import React from 'react';
import {createGlobalStyle} from 'styled-components';
import reset from 'styled-reset'

const Chat = () => {
    const GlobalStyle = createGlobalStyle`
        ${reset}
    `;


    return (
        <>
            <GlobalStyle/>
            <div id="chat-wrap">
                <h1 className="test-title">TEST!</h1>
            </div>
        </>
    );
};

export default Chat;