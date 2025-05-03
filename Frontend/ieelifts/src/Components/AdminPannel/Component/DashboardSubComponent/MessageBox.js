import React, { useRef, useState, useEffect, useLayoutEffect } from "react";
import { RxCross2 } from "react-icons/rx";
import { MdSend } from "react-icons/md";
import { MdAddCall } from "react-icons/md";
import { MdOutlineMic } from "react-icons/md";
import { MdOutlineAttachFile } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { createChatActions } from "../../../../ReduxSetup/Actions/ChatActions";
import { sendChatMessageAction } from "../../../../ReduxSetup/Actions/ChatActions";
import { getSenderMessagesAction } from "../../../../ReduxSetup/Actions/ChatActions";
import io from "socket.io-client";
import EngChatNav from "../EngeeniersSubComponent/EngChatNav";
import { IoCallOutline } from "react-icons/io5";
import { CiVideoOn } from "react-icons/ci";
const MessageBox = ({ onClose, EnggId }) => {
  const dispatch = useDispatch();
  const fileInputField = useRef(null);
  const textareaRef = useRef();
  const messageBodyRef = useRef(null);
  const [messageData, setMessageData] = useState();
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const [file, setFile] = useState(false);
  const [textareaHeight, setTextareaHeight] = useState();
  const [swapIcon, setSwapIcon] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [allMessages, setAllMessages] = useState([]);

  const scroll = () => {
    if (messageBodyRef.current) {
      messageBodyRef.current.scrollTop = messageBodyRef.current.scrollHeight;
    }
  };
  const handleFileChange = (e) => {
    setFile(e.target.files[0].name);
  };
  useEffect(() => {
    setHeight(textareaRef.current);
  }, []);
  //socket implemantation starts ---------------------------------------------
  // const socket = io('ws://localhost:4000');
  const socket = io('https://ieelifts.in/');
  useEffect(() => {
    socket.on("connect", () => {
      console.log("socket is connected successfully")
    });
    return () => {
      socket.disconnect();  
      };
  }, []);

  



  const chatCreated = useSelector((state) => {
    if (
      state.ChatRootReducer &&
      state.ChatRootReducer.createChatReducer &&
      state.ChatRootReducer.createChatReducer.createChat
    ) {
      return state.ChatRootReducer.createChatReducer.createChat.FullChat;
    } else {
      return null;
    }
  });

  const getMessages = useSelector((state) => {

    if (
      state.ChatRootReducer &&
      state.ChatRootReducer.getSenderMessagesReducer &&
      state.ChatRootReducer.getSenderMessagesReducer.message
    ) {
      return state.ChatRootReducer.getSenderMessagesReducer.message.chats;
    } else {
      return null;
    }
  });

  useEffect(() => {
    const fetchIntiakMessages = async () => {
      setIsLoading(true);
      setIsLoadingMessages(true);
      const FinalMessages = await getMessages?.map((data) => {
        return {
          chatId: data.ChatId,
          Content: data.Content,
          Sender: data.Sender[0],
        };
      });

      setAllMessages(FinalMessages);
      setIsLoadingMessages(false);
      setIsLoading(false);
    };

    fetchIntiakMessages();
    scroll();
  }, [getMessages]);

  const sendMessage = useSelector(
    (state) => state?.ChatRootReducer?.sendMessageReducer?.chatMessage

  );
  useEffect(() => {
    setAllMessages([]);
    setIsLoadingMessages(true);
    dispatch(createChatActions(EnggId, "65e0103005fd2695f3aaf6d4")); //todo - in future the id is dynamic as come from login user
    if (chatCreated?._id) {
      dispatch(getSenderMessagesAction(chatCreated._id));
    }
    // Cleanup function
    return () => {
      setIsLoadingMessages(true);
      if (chatCreated?._id) {
        dispatch(getSenderMessagesAction()); // Clear sender messages when unmounting
        dispatch(createChatActions());
      }
    };
  }, [dispatch, chatCreated?._id, EnggId]);
  const setHeight = (elem) => {
    const style = window.getComputedStyle(elem, null);
    const verticalBorders = Math.round(
      parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth)
    );
    const maxHeight = parseFloat(style.maxHeight) || 70;
    elem.style.height = "20px";
    const newHeight = elem.scrollHeight + verticalBorders;
    elem.style.overflowY = newHeight > maxHeight ? "auto" : "hidden";
    elem.style.height = Math.min(newHeight, maxHeight) + "px";
    setTextareaHeight(Math.min(newHeight, maxHeight));
  };
  const handleInput = () => {
    setHeight(textareaRef.current);
    setSwapIcon(!textareaRef.current.value.trim());
  };

  //function to send the message ------------------------------------------------
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (chatCreated?._id) {
      const myNewMessage = await sendChatMessageAction(
        "65e0103005fd2695f3aaf6d4",
        messageData,
        chatCreated?._id
      );
      if (myNewMessage) {
        socket.emit("aloo", myNewMessage.data);
      }
      dispatch(getSenderMessagesAction(chatCreated._id));
      setMessageData("");
    }

    if (textareaRef.current) {
      textareaRef.current.value = "";
      handleInput();
    }

    setTimeout(() => {
      if (chatCreated?._id) {
        dispatch(getSenderMessagesAction(chatCreated._id));
      }
    }, 100);
    socket.emit("aloo", sendMessage);
  };

  useLayoutEffect(() => {
    scroll();
  }, [getMessages]);

useEffect(() => {
  socket.on("EnggNewMessage", (message) => {
    setAllMessages((prevMessages) => [...prevMessages, message]);
  });
}, []);



  useEffect(() => {
  
    scroll();
  }, [allMessages]);
  
  return (
    <>
      <EngChatNav />
      <div className="EngChatBox-Dash">
        <div className="EngChatBoxHead-Dash">
          <h6>online</h6>
          <div className="EngChatBoxIcons-Dash">
            <IoCallOutline className="cursor"/>
            <CiVideoOn  className="cursor"/>
            <RxCross2 onClick={onClose}  className="cursor"/>
          </div>
        </div>
        <div className="EngChatMsg-Dash"  >
          <div className="SubEngChatMsg-Dash Yello_Scrollbar" ref={messageBodyRef} >
            {isLoadingMessages ? (
              <div className="skelton-in-message">
                <div className="loader">
                  <div class="box"></div>
                  <p>Loading...</p>
                </div>
              </div>
            ) : allMessages?.length >= 0 ? (
              allMessages?.map((item, index) => {
                const isCurrentUser =
                  item.Sender === "65e0103005fd2695f3aaf6d4";
                return (
                  <div
                    className={
                      isCurrentUser
                        ? "engchatmsg-sender-side-dash"
                        : "engchatmsg-reciver-side-dash"
                    }
                    key={index}
                  >
                    <div
                      className={
                        isCurrentUser
                          ? "engchatmsg-sender-message-dash"
                          : "engchatmsg-reciver-message-dash"
                      }
                    >
                      <p>{item.Content}</p>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="skelton-in-message">
                <div className="loader">
                  <div class="box"></div>
                  <p>No Message Yet</p>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="agdam-eng-card-dash">
          <div className="eng-card-message-text-dash">
            <textarea
              placeholder="Enter message"
              ref={textareaRef}
              onInput={handleInput}
              style={{
                resize: "none",
                minHeight: "50px",
                height: `${textareaHeight}px`,
                fontFamily: "Poppins",
              }}
              className="text-area-message-eng-card-dash"
              onChange={(e) => setMessageData(e.target.value)}
              value={messageData}
            />
          </div>
          <div className="user-attachment4-eng-card-dash">
            <div className="user-attachment2-eng-card-dash">
              <input
                id="file-upload"
                type="file"
                name="file"
                onChange={handleFileChange}
                ref={fileInputField}
                style={{ display: "none" }}
              ></input>
              <div
                onClick={() => fileInputField.current.click()}
                style={{ marginTop: "3px" }}
              >
                <MdOutlineAttachFile />
              </div>
            </div>
            <p
              className="send-messsage-eng-card-dash"
              onClick={handleSendMessage}
            >
              {swapIcon ? <MdOutlineMic /> : <MdSend />}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
export default MessageBox;