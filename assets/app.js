const WS_URL="ws://silenthost-inf.duckdns.org:8080";


let socket;


function connectWS(callback){


    socket=new WebSocket(WS_URL);


    socket.onopen=()=>{

        console.log("Websocket connected");

        if(callback)
            callback();

    };


    socket.onclose=()=>{

        console.log("Disconnected");

        setTimeout(()=>connectWS(callback),3000);

    };


    socket.onerror=e=>{

        console.log(e);

    };


    return socket;

}
