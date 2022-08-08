import React, { useCallback, useState } from 'react';
import {createGlobalStyle} from 'styled-components';
import reset from 'styled-reset'

const Chat = () => {
    const [msg, setMsg] = useState("");
    const [name, setName] = useState("홍길동");

    const GlobalStyle = createGlobalStyle`
        ${reset}
    `;

    /**
     * web socket
     */

    function getId(id){
        return document.getElementById(id);
    }

    var data = {};  //전송 데이터(JSON)
    let ws = new WebSocket("ws://localhost:8080/socket/chatt");
    var mid = getId('mid');
    var talk = getId('talk');

    const onText = event => {
        console.log(event.target.value);
        setMsg(event.target.value);
    }
    
    const webSocketLogin = useCallback(() => {
        // ws = new WebSocket("ws://localhost:8080/socket/chatt");
        console.log("hello");
        ws.onmessage = function(msg){
            console.log(msg);
            var data = JSON.parse(msg.data);
            var css;
            
            console.log(data.mid);
            if(data.mid === mid.value){
                css = 'class=me';
            }else{
                css = 'class=other';
            }
            
            var item = `<div ${css} >
                            <span><b>${data.mid}</b></span> [ ${data.date} ]<br/>
                        <span>${data.msg}</span>
                            </div>`;
                        
            talk.innerHTML += item;
            talk.scrollTop=talk.scrollHeight;//스크롤바 하단으로 이동
        }
    });

    const send = useCallback(() => {
        if(msg !== ''){
            data.mid = getId('mid').value;
            data.msg = msg;
            data.date = new Date().toLocaleString();
            var temp = JSON.stringify(data);
            ws.send(temp);
        }
        setMsg("");
    });

    return (
        <>
            <GlobalStyle/>
            <div id="chat-wrap">
                <div id='chatt'>
                    <h1>WebSocket Chatting</h1>
                    <input type='text' id='mid' defaultValue={name} onChange={(event => setName(event.target.value))}/>
                    <input type='button' defaultValue='로그인' id='btnLogin' onClick={webSocketLogin}/>
                    <br/>
                    <div id='talk'></div>
                    <div id='sendZone'>
                        <textarea id='msg' defaultValue={msg} onChange={onText}
                            onKeyUp={(ev) => {if(ev.keyCode === 13){send();}}}></textarea>
                        <input type='button' defaultValue='전송' id='btnSend' onClick={send}/>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Chat;