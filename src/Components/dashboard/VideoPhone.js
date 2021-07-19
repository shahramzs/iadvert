// import Button from "@material-ui/core/Button"
// import IconButton from "@material-ui/core/IconButton"
// import TextField from "@material-ui/core/TextField"
// import AssignmentIcon from "@material-ui/icons/Assignment"
// import PhoneIcon from "@material-ui/icons/Phone"
// import React, { useEffect, useRef, useState } from "react"
// import Peer from "simple-peer"
// import io from "socket.io-client"
// import '../../css/mobileScreen.css'

// const ENDPOINT = 'localhost:9000';
// const socket = io( ENDPOINT, {'transports': ['websocket', 'polling']});


// function VideoPhone(props) {
// 	const [ me, setMe ] = useState("")
// 	const [ stream, setStream ] = useState()
// 	const [ receivingCall, setReceivingCall ] = useState(false)
// 	const [ caller, setCaller ] = useState("")
// 	const [ callerSignal, setCallerSignal ] = useState()
// 	const [ callAccepted, setCallAccepted ] = useState(false)
// 	const [ idToCall, setIdToCall ] = useState("")
// 	const [ callEnded, setCallEnded] = useState(false)
// 	const [ name, setName ] = useState("")
// 	const myVideo = useRef()
// 	const userVideo = useRef()
// 	const connectionRef= useRef()
// 	const otherUser = useRef();

// 	useEffect(() => {
// 		navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
// 			setStream(stream)
// 			myVideo.current.srcObject = stream;  
// 		})

// 		// socket.on("me", (id) => {
// 		// 	setMe(id)
// 		// 	})
		
// 		socket.emit("join room", props.token);

// 			socket.on('other user', userID => {
// 				setIdToCall(userID)
//                 otherUser.current = userID;
//             });

// 			socket.on("user joined", userID => {
//                 otherUser.current = userID;
//             });
		
// 		socket.on("callUser", (data) => {
// 			setReceivingCall(true)
// 			setCaller(data.from)
// 			setName(data.name)
// 			setCallerSignal(data.signal)
// 		})
	
// 		setName(props.reciever)
		
// 		return () => {

// 		}
// 	}, [])


// 	const callUser = (id) => {

// 		const peer = new Peer({
// 			initiator: true,
// 			trickle: false,
// 			stream: stream
// 		})
// 		peer.on("signal", (data) => {
// 			socket.emit("callUser", {
// 				userToCall: id,
// 				signalData: data,
// 				from: me,
// 				name: name
// 			})
// 		})
// 		peer.on("stream", (stream) => {
// 			if (userVideo.current) {
// 				userVideo.current.srcObject = stream
// 		    }
// 		})
		
// 		socket.on("callAccepted", (signal) => {
// 			setCallAccepted(true)
// 			peer.signal(signal)
// 		})

// 		connectionRef.current = peer

       
// 	}

// 	const answerCall =() =>  {
// 		setCallAccepted(true)
// 		const peer = new Peer({
// 			initiator: false,
// 			trickle: false,
// 			stream: stream
// 		})
// 		peer.on("signal", (data) => {
// 			socket.emit("answerCall", { signal: data, to: caller })
// 		})
// 		peer.on("stream", (stream) => {
// 			userVideo.current.srcObject = stream
// 		})

// 		peer.signal(callerSignal)
// 		connectionRef.current = peer
// 	}

// 	const leaveCall = () => {
// 		setCallEnded(true)
// 		connectionRef.current.destroy()
// 	}

	

// 	return (
// 		<>
// 		<div className="container">
// 			<div className="video-container">
// 				<div className="video">
// 					{stream &&  <video playsInline muted ref={myVideo} autoPlay style={{ width: "300px", borderRadius:'20px'}} />}
// 				</div>
// 				<div className="video">
// 					{callAccepted && !callEnded ?
// 					<video playsInline ref={userVideo} autoPlay style={{ width: "500px", borderRadius:'20px', marginLeft:'-23%'}} />:
// 					null}
// 				</div>
// 			</div>

// 			<div className="myId">
// 				<div className="call-button">
// 					{callAccepted && !callEnded ? (
// 						<Button variant="contained" color="secondary" onClick={leaveCall}>
// 							End Call
// 						</Button>
// 					) : (
// 						<IconButton color="primary" aria-label="call" onClick={() => callUser(idToCall)}>
// 							<PhoneIcon fontSize="large" />
// 						</IconButton>
// 					)}
// 				</div>
//                 <div className="idCall">
//                     <strong>Id Call: </strong> <i>{idToCall}</i><br/>
//                     <strong style={{marginTop:'2%'}}>user calling: </strong> <i>{props.sender}</i><br/>
//                     <strong style={{marginTop:'2%'}}>user recieving: </strong> <i>{props.reciever}</i>
//                 </div>
// 			</div>
// 			<div>
// 				{receivingCall && !callAccepted ? (
// 						<div className="caller">
// 						<h6 >{name} is calling...</h6>
// 						<Button variant="contained" color="primary" onClick={answerCall} style={{marginLeft:'27%'}}>
// 							Answer
// 						</Button>
// 					</div>
// 				 ) : null} 
// 			</div>
// 		</div>

// 		</>
// 	)
// }

// export default VideoPhone