const WS_URL = "ws://silenthost-inf.duckdns.org:8080";


let socket = null;

let role = null;
let username = null;



function connectWS(){

    socket = new WebSocket(WS_URL);


    socket.onopen = ()=>{

        console.log(
            "Connected to MCWebBridge"
        );

    };


    socket.onclose = ()=>{

        console.log(
            "Disconnected"
        );

    };


    socket.onerror = (e)=>{

        console.error(
            "WebSocket error",
            e
        );

    };


    socket.onmessage = (event)=>{


        let data;


        try{

            data =
            JSON.parse(
                event.data
            );


        }
        catch{

            return;

        }




        handlePacket(data);


    };


}




function sendPacket(data){

    if(
        socket &&
        socket.readyState === WebSocket.OPEN
    ){

        socket.send(
            JSON.stringify(data)
        );

    }

}







function login(user,pass){


    username=user;


    sendPacket({

        type:"login",

        username:user,

        password:pass

    });


}









function handlePacket(data){


    console.log(data);



    window.dispatchEvent(

        new CustomEvent(
            "mcwebbridge",
            {
                detail:data
            }
        )

    );


}





connectWS();
