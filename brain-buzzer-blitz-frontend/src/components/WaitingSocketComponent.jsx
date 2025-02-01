import { useEffect, useRef } from 'react';
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';

const WaitingSocketComponent = ({ userName, onGameBegan }) => {
  const alreadyConnectedRef = useRef(false);

  useEffect(() => {
    if (alreadyConnectedRef.current) return;

    const connect = () => {
      const socket = new SockJS('http://localhost:8080/websocket');
      const stompClient = Stomp.over(socket);
  
      stompClient.connect({}, function(frame) {
        console.log('Connected: ' + frame);

        stompClient.subscribe(`/func/began/${userName}`, function(message) {
          onGameBegan(JSON.parse(message.body));
          console.log(message.body);
        });

      });
    };
    connect();
    alreadyConnectedRef.current = true; 
  }, []);

  return null;
};

export default WaitingSocketComponent;
