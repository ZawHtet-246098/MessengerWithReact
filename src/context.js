import React, { createContext, useState, useRef, useEffect } from "react";
import { io } from "socket.io-client";
import Peer from "simple-peer";

const SocketContext = createContext();

// const socket = io("http://localhost:5000");
// const socket = io("https://warm-wildwood-81069.herokuapp.com");

const ContextProvider = ({ children }) => {
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [stream, setStream] = useState();
  const [name, setName] = useState("");
  const [call, setCall] = useState({});
  const [me, setMe] = useState("");
  const [socket, setSocket] = useState();

  console.log("====================================");
  console.log(me);
  console.log(stream)
  console.log("====================================");

  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  console.log('myVideo', myVideo);
  console.log('userVideo', userVideo);
  console.log('connectionRef', connectionRef);
  console.log('stream', stream);
  console.log('callAccepted', callAccepted);
  console.log('callEnded', callEnded);
  console.log('name', name);
  console.log('call', call);
  console.log('me', me);

  // useEffect(() => {
  //   navigator.mediaDevices
  //     .getUserMedia({ video: true, audio: true })
  //     .then((currentStream) => {
  //       setStream(currentStream);

  //       myVideo.current.srcObject = currentStream;
  //     });

  //   // socket.on("me", (id) => setMe(id));

  //   socket.on("callUser", ({ from, name: callerName, signal }) => {
  //     setCall({ isReceivingCall: true, from, name: callerName, signal });
  //   });
  // }, []);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);
        if (myVideo.current && currentStream) {
          myVideo.current.srcObject = currentStream;
        }
      });

    // socket.on("me", (id) => setMe(id));


  }, []);

  // socket.on("callUser", ({ from, name: callerName, signal }) => {
  //   console.log({ isReceivingCall: true, from, name: callerName, signal })
  //   setCall({ isReceivingCall: true, from, name: callerName, signal });
  // });

  // useEffect(() => {
  //   socket.on('testing', data => {
  //     console.log(data, 'testing socket')
  //   })
  // }, [socket]);


  const answerCall = () => {
    setCallAccepted(true);

    const peer = new Peer({ initiator: false, trickle: false, stream });

    console.log(stream)

    peer.on("signal", (data) => {
      socket.current.emit("answerCall", { signal: data, to: call.from });
    });

    peer.on("stream", (currentStream) => {
      console.log("Received stream:", currentStream);
      console.log(userVideo)
      userVideo.current.srcObject = currentStream;
    });

    peer.signal(call.signal);

    connectionRef.current = peer;
  };

  const callUser = (to, from) => {
    const peer = new Peer({ initiator: true, trickle: false, stream });

    peer.on("signal", (data) => {
      socket.current.emit("callUser", {
        userToCall: to,
        signalData: data,
        from: from,
        name: 'Zaw',

        // to: currentChatUser?._id,
        // from: authData?._id,
        // msg: message,
      });
    });

    peer.on("stream", (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    socket.current.on("callAccepted", (signal) => {
      setCallAccepted(true);

      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);

    connectionRef.current.destroy();

    window.location.reload();
  };

  return (
    <SocketContext.Provider
      value={{
        call,
        callAccepted,
        myVideo,
        userVideo,
        stream,
        name,
        setName,
        callEnded,
        me,
        setMe,
        callUser,
        leaveCall,
        answerCall,
        setCall,
        setCallAccepted,
        setSocket
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { ContextProvider, SocketContext };
