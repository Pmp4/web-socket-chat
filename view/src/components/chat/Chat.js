import React, { useCallback, useRef, useState, useEffect } from 'react';
import {createGlobalStyle} from 'styled-components';
import reset from 'styled-reset'
import ChattService from '../../api/ChattService';


const Chat = () => {
    const [msg, setMsg] = useState("");
    const [name, setName] = useState("");
    const [chatt, setChatt] = useState([]);
    const [chkLog, setChkLog] = useState(false);

    const ws = useRef(null);    //webSocket을 담는 변수, 
                                //컴포넌트가 변경될 때 객체가 유지되어야하므로 'ref'로 저장
    let chattIdx = useRef(0);    

    const msgBox = chatt.map((item, idx) => (
        <div key={idx} className={item.name === name ? 'me' : 'other'}>
            <span><b>{item.name}</b></span> [ {item.date} ]<br/>
            <span>{item.msg}</span>
        </div>
    ));


    useEffect(() => {
        ChattService.chattView()
            .then((response) => {
                console.log(response);
            })
    }, []);


    const GlobalStyle = createGlobalStyle`  //css 초기화가 된 component
        ${reset}
    `;


    //webSocket
    //webSocket
    //webSocket
    //webSocket
    //webSocket
    //webSocket
    let data = {};  //전송 데이터(JSON)

    const onText = event => {
        console.log(event.target.value);
        setMsg(event.target.value);
    }

    const chattLogSet = (data) => {
        
            // console.log(message);
            console.log(data);
            console.log(JSON.stringify(chatt))
            let tempChatt = [...chatt];
            console.log(tempChatt);
            tempChatt.push(data);

            setChatt(tempChatt);
    };
    
    const webSocketLogin = useCallback(() => {
        ws.current = new WebSocket("ws://localhost:8080/socket/chatt");
        // console.log(ws.current);

        ws.current.onmessage = (message) => {
            const dataSet = JSON.parse(message.data);

            chattLogSet(dataSet);
        }

        /* ws.current.onmessage = function(msg){
            console.log(msg);
            const data = JSON.parse(msg.data);
            console.log(data);
            
            
            var css;
            
            console.log(data.mid);
            if(data.name === name){
                css = 'class=me';
            }else{
                css = 'class=other';
            }
            
            var item = `<div ${css} >
                            <span><b>${data.name}</b></span> [ ${data.date} ]<br/>
                        <span>${data.msg}</span>
                            </div>`;
                        
            
            document.getElementById("talk").innerHTML += item;
            document.getElementById("talk").scrollTop=document.getElementById("talk").scrollHeight;//스크롤바 하단으로 이동
            
        }*/
    });

    const send = useCallback(() => {
        if(!chkLog) {
            if(name === "") {
                alert("이름을 입력하세요.");
                document.getElementById("name").focus();
                return;
            }
            webSocketLogin();
            setChkLog(true);
        }

        if(msg !== ''){
            data.name = name;
            data.msg = msg;
            data.date = new Date().toLocaleString();
            const temp = JSON.stringify(data);
            
            if(ws.current.readyState === 0) {
                ws.current.onopen = () => { //webSocket이 맺어지고 난 후, 실행
                    console.log(ws.current.readyState);
                    ws.current.send(temp);
                }
            }else {
                ws.current.send(temp);
            }
            
            // ws.current.onopen = () => { //webSocket이 맺어지고 난 후, 실행
            //     console.log(ws.current.readyState);
            //     ws.current.send(temp);
            // }
        }else {
            alert("메세지를 입력하세요.");
            document.getElementById("msg").focus();
            return;
        }
        setMsg("");
    });
    //webSocket
    //webSocket
    //webSocket
    //webSocket
    //webSocket
    //webSocket


    return (
        <>
            <GlobalStyle/>
            <div id="chat-wrap">
                <div id='chatt'>
                    <h1 id="title">WebSocket Chatting</h1>
                    <br/>
                    <div id='talk'>
                        <div className='talk-shadow'></div>
                        {msgBox}
                    </div>
                    <input disabled={chkLog}
                        placeholder='이름을 입력하세요.' 
                        type='text' 
                        id='name' 
                        value={name} 
                        onChange={(event => setName(event.target.value))}/>
                    <div id='sendZone'>
                        <textarea id='msg' value={msg} onChange={onText}
                            onKeyDown={(ev) => {if(ev.keyCode === 13){send();}}}></textarea>
                        <input type='button' value='전송' id='btnSend' onClick={send}/>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Chat;