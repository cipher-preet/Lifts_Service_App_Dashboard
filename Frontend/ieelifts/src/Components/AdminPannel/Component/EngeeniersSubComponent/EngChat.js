import React from 'react'
import { RxCross2 } from "react-icons/rx";
import { MdSend } from "react-icons/md";
import { MdAddCall } from "react-icons/md";
import { MdOutlineMic } from "react-icons/md";
import { MdOutlineAttachFile } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { createChatActions } from "../../../../ReduxSetup/Actions/ChatActions"
import { sendChatMessageAction } from "../../../../ReduxSetup/Actions/ChatActions"
import { getSenderMessagesAction } from "../../../../ReduxSetup/Actions/ChatActions"
import EngChatNav from './EngChatNav';
import { CiVideoOn } from "react-icons/ci";
import { IoCallOutline } from "react-icons/io5";
import { FaRegFileAlt } from "react-icons/fa";
import { useState, useRef, useEffect, useLayoutEffect } from 'react'




const EngChat = (props) => {
    const clickCount=props.clickCount;
const setClickCount=props.setClickCount;
    const dispatch = useDispatch();

const fileInputField = useRef(null);
const textareaRef = useRef();
const messageBodyRef = useRef(null);


const [messageData, setMessageData] = useState();
const [socketConnected, setSocketConnected] = useState(false);
const [file, setFile] = useState(false);
const [textareaHeight, setTextareaHeight] = useState();
const [swapIcon, setSwapIcon] = useState(true);





    
  // const scroll = () => {
  //   if (messageBodyRef.current) {
  //     messageBodyRef.current.scrollTop = messageBodyRef.current.scrollHeight;
  //   }
  // };





  // const handleFileChange = (e) => {
  //   setFile(e.target.files[0].name);
  // };


  // useEffect(() => {
  //   setHeight(textareaRef.current);

  // }, []);


  //socket implemantation starts ---------------------------------------------
  // const socket = io('http://localhost:8000');

  // useEffect(() => {
  //  socket.emit("setup", '65d49276f60a227274baf8e1');
  //  socket.on("connection", () => setSocketConnected(true))

  //   return () => {
  //     socket.disconnect();
  //   };
  // }, []);







  const chatCreated = useSelector((state) => {
    if (state.ChatRootReducer && state.ChatRootReducer.createChatReducer && state.ChatRootReducer.createChatReducer.createChat) {
      return state.ChatRootReducer.createChatReducer.createChat.FullChat
    } else {
      return null
    }
  });
  // console.log("chat created", chatCreated?._id)


  // const getMessages = useSelector((state) => {

  //   scroll();
  //   if (state.ChatRootReducer && state.ChatRootReducer.getSenderMessagesReducer && state.ChatRootReducer.getSenderMessagesReducer.message) {

  //     return state.ChatRootReducer.getSenderMessagesReducer.message.chats

  //   } else {
  //     return null
  //   }
  // })
  // // console.log("all messages",getMessages)


  // useEffect(() => {
  //   dispatch(createChatActions(EnggId, '65d49276f60a227274baf8e1')); //todo - in future the id is dynamic as come from login user


  //   setTimeout(() => {
  //     if (chatCreated?._id) {
  //       dispatch(getSenderMessagesAction(chatCreated._id));
  //     }
  //   }, 400)
  //   // Cleanup function
  //   return () => {
  //     if (chatCreated?._id) {
  //       dispatch(getSenderMessagesAction()); // Clear sender messages when unmounting
  //       dispatch(createChatActions())
  //     }
  //   };
  // }, [dispatch, chatCreated?._id]);




  // const setHeight = (elem) => {
  //   const style = window.getComputedStyle(elem, null);
  //   const verticalBorders = Math.round(
  //     parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth)
  //   );
  //   const maxHeight = parseFloat(style.maxHeight) || 70;

  //   elem.style.height = "20px";

  //   const newHeight = elem.scrollHeight + verticalBorders;

  //   elem.style.overflowY = newHeight > maxHeight ? "auto" : "hidden";
  //   elem.style.height = Math.min(newHeight, maxHeight) + "px";

  //   setTextareaHeight(Math.min(newHeight, maxHeight));
  // };

  // const handleInput = () => {

  //   setHeight(textareaRef.current);
  //   setSwapIcon(!textareaRef.current.value.trim());
  // };



  // const handleSendMessage = () => {
  //   dispatch(sendChatMessageAction('65d49276f60a227274baf8e1', messageData, chatCreated?._id)); //todo - in future the id is dynamic as come from login user
  //   setMessageData('');


  //   if (textareaRef.current) {
  //     textareaRef.current.value = '';
  //     handleInput();

  //   }



  //   setTimeout(() => {
  //     if (chatCreated?._id) {
  //       dispatch(getSenderMessagesAction(chatCreated._id));
  //     }

  //   }, 400)

  // }

  // useLayoutEffect(() => {
  //   scroll();
  // }, [getMessages]);

    return (
        <div className='EngeeniersChat' style={{display:clickCount.clickC >0?'block':'none'}} >
            <EngChatNav />
            <div className='EngChatBox'>
                <div className='EngChatBoxHead'>
                    <h6>online</h6>
                    <div className='EngChatBoxIcons'>
                        <IoCallOutline />
                        <CiVideoOn />
                    </div>
                </div>
                <div className='EngChatMsg'>
                    <div className='SubEngChatMsg Yello_Scrollbar'>

                        <div className="engchatmsg-sender-side">
                            <div className="engchatmsg-sender-message">
                                <p>Hi there! How are you doing today?</p>
                            </div>
                        </div>

                        <div className=".engchatmsg-reciver-side">
                            <div className="engchatmsg-reciver-message">
                                <p>Hey! I'm doing well, thanks. How about you?</p>
                            </div>
                        </div>
                        <div className="engchatmsg-sender-side">
                            <div className="engchatmsg-sender-message">
                                <p>I'm good too, thanks for asking. Did you do anything interesting recently?
                                </p>
                            </div>
                        </div>

                        <div className=".engchatmsg-reciver-side">
                            <div className="engchatmsg-reciver-message">
                                <p>Not much, just caught up on some reading and went for a walk. How about you?
                                </p>
                            </div>
                        </div>

                        <div className=".engchatmsg-reciver-side">
                            <div className="engchatmsg-reciver-message">
                                <p>Not much, just caught up on some reading and went for a walk. How about you?
                                </p>
                            </div>
                        </div>
                        <div className=".engchatmsg-reciver-side">
                            <div className="engchatmsg-reciver-message">
                                <p>Not much, just caught up on some reading and went for a walk. How about you?
                                </p>
                            </div>
                        </div>
                        <div className=".engchatmsg-reciver-side">
                            <div className="engchatmsg-reciver-message">
                                <p>Not much, just caught up on some reading and went for a walk. How about you?
                                </p>
                            </div>
                        </div>
                        <div className=".engchatmsg-reciver-side">
                            <div className="engchatmsg-reciver-message">
                                <p>Not much, just caught up on some reading and went for a walk. How about you?
                                </p>
                            </div>
                        </div>
                        <div className=".engchatmsg-reciver-side">
                            <div className="engchatmsg-reciver-message">
                                <p>Not much, just caught up on some reading and went for a walk. How about you?
                                </p>
                            </div>
                        </div>
                        <div className=".engchatmsg-reciver-side">
                            <div className="engchatmsg-reciver-message">
                                <p>Not much, just caught up on some reading and went for a walk. How about you?
                                </p>
                            </div>
                        </div>
                        <div className=".engchatmsg-reciver-side">
                            <div className="engchatmsg-reciver-message">
                                <p>Not much, just caught up on some reading and went for a walk. How about you?
                                </p>
                            </div>
                        </div>
                        <div className=".engchatmsg-reciver-side">
                            <div className="engchatmsg-reciver-message">
                                <p>Not much, just caught up on some reading and went for a walk. How about you?
                                </p>
                            </div>
                        </div>
                        <div className=".engchatmsg-reciver-side">
                            <div className="engchatmsg-reciver-message">
                                <p>Not much, just caught up on some reading and went for a walk. How about you?
                                </p>
                            </div>
                        </div>
                        <div className=".engchatmsg-reciver-side">
                            <div className="engchatmsg-reciver-message">
                                <p>Not much, just caught up on some reading and went for a walk. How about you?
                                </p>
                            </div>
                        </div>
                        <div className=".engchatmsg-reciver-side">
                            <div className="engchatmsg-reciver-message">
                                <p>Not much, just caught up on some reading and went for a walk. How about you?
                                </p>
                            </div>
                        </div>
                        <div className=".engchatmsg-reciver-side">
                            <div className="engchatmsg-reciver-message">
                                <p>Not much, just caught up on some reading and went for a walk. How about you?
                                </p>
                            </div>
                        </div>
                        <div className=".engchatmsg-reciver-side">
                            <div className="engchatmsg-reciver-message">
                                <p>Not much, just caught up on some reading and went for a walk. How about you?
                                </p>
                            </div>
                        </div>
                        <div className=".engchatmsg-reciver-side">
                            <div className="engchatmsg-reciver-message">
                                <p>Not much, just caught up on some reading and went for a walk. How about you?
                                </p>
                            </div>
                        </div>
                        <div className=".engchatmsg-reciver-side">
                            <div className="engchatmsg-reciver-message">
                                <p>Not much, just caught up on some reading and went for a walk. How about you?
                                </p>
                            </div>
                        </div>







                    </div>

                </div>

                <div className="agdam-eng-card" >
                    <div className="eng-card-message-text">
                        <textarea
                            placeholder="Enter message"
                            // ref={textareaRef}
                            // onInput={handleInput}
                            style={{ resize: "none", minHeight: '50px', height: `${textareaHeight}px`, fontFamily: "Poppins" }}
                            className="text-area-message-eng-card"
                            onChange={(e) => setMessageData(e.target.value)}
                            value={messageData}
                        />

                    </div>

                    <div className="user-attachment4-eng-card">
                        <div className="user-attachment2-eng-card">
                            <input
                                id="file-upload"
                                type="file"
                                name="file"
                                // onChange={handleFileChange}
                                // ref={fileInputField}
                                style={{ display: "none" }}
                            ></input>
                            <div
                                onClick={() => fileInputField.current.click()}
                                style={{ marginTop: "3px" }}
                            >
                                <MdOutlineAttachFile />
                            </div>
                        </div>

                        <p className="send-messsage-eng-card ">
                            {/* onClick={handleSendMessage} */}
                            {swapIcon ? (<MdOutlineMic />) : (<MdSend />)}
                        </p>
                    </div>
                </div>



            </div>


        </div>
    )
}

export default EngChat