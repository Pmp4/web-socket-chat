import React, { useCallback, useRef, useState, useEffect } from 'react';
import $ from 'jquery';
import {createGlobalStyle} from 'styled-components';
import reset from 'styled-reset'
import ChattService from '../../api/ChattService';


const Chat = () => {
    const [msg, setMsg] = useState("");
    const [name, setName] = useState("홍길동");
    const [chatt, setChatt] = useState([]);

    let ws = useRef(null);

    const msgBox = chatt.map((item) => (
        <div className={item.name === name ? 'me' : 'other'}>
            <span><b>{item.mid}</b></span> [ {item.date} ]<br/>
            <span>{item.msg}</span>
        </div>
    ));


    useEffect(() => {
        ChattService.chattView()
            .then((response) => {
                console.log(response);
            })
            // .catch((error) => alert(error));
    }, []);


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
    // let ws = "";

    const onText = event => {
        console.log(event.target.value);
        setMsg(event.target.value);
    }
    
    const webSocketLogin = useCallback(() => {
        ws.current = new WebSocket("ws://localhost:8080/socket/chatt");

        ws.current.onmessage = function(msg){
            console.log(msg);
            var data = JSON.parse(msg.data);
            console.log(data);
            

            /*var css;
            
            console.log(data.mid);
            if(data.mid === name){
                css = 'class=me';
            }else{
                css = 'class=other';
            }
            
            var item = `<div ${css} >
                            <span><b>${data.mid}</b></span> [ ${data.date} ]<br/>
                        <span>${data.msg}</span>
                            </div>`;
                        
            
            document.getElementById("talk").innerHTML += item;
            document.getElementById("talk").scrollTop=document.getElementById("talk").scrollHeight;//스크롤바 하단으로 이동
            */
        }
    });

    const send = useCallback(() => {
        if(msg !== ''){
            data.mid = getId('mid').value;
            data.msg = msg;
            data.date = new Date().toLocaleString();
            var temp = JSON.stringify(data);
            ws.current.send(temp);
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
                    <div id='talk'>
                        {msgBox}
                    </div>
                    <div id='sendZone'>
                        <textarea id='msg' value={msg} onChange={onText}
                            onKeyDown={(ev) => {if(ev.keyCode === 13){send();}}}></textarea>
                        <input type='button' defaultValue='전송' id='btnSend' onClick={send}/>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Chat;