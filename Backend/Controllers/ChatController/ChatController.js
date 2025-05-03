const ChatModal = require("../../Modals/ChatModel/ChatModalSchema");

const MessageModal = require("../../Modals/ChatModel/MessageModal");

// const EnggDetailModel = require("../../Modals/ServiceEngineerModals/ServiceEngineerDetailSchema");


//--------------------------------------------------------------------------------------------------------------------------------------------
//create chat for both sender and reciver

module.exports.CreateChat = async (req,res) => {
    try {
        const { userId , LoginId } = req.body;

        var isChat = await ChatModal.find({
            $and:[
                {Users: {$elemMatch:{ $eq:LoginId }}},
                {Users: {$elemMatch:{ $eq:userId }}}
                ]
        })

        if(isChat.length > 0){
        //   return res.send(isChat[0])
          return res.status(200).json({FullChat:isChat[0]})
        }else{
            var chatData = {
                ChatName:"sender",
                Users:[userId , LoginId]
            }
        }

        const createdChat = await ChatModal.create(chatData);

         const FullChat = await ChatModal.findOne({ _id: createdChat._id});

      

          return res.status(200).json({FullChat})

    } catch (error) {
        console.log(error)
    }
}



//--------------------------------------------------------------------------------------------------------------------------------------------

//function to handle sendmessage

module.exports.sendMessage = async (req,res) =>{   
    try {
        const {Sender , Content, ChatId, serviceId } = req.body;

        if(!Sender || !Content || !ChatId){
            return res.status(400).json({message:'Invalid data pass in the Request'})
        }

        var newMessage = {
            Sender,
            Content,
            ChatId,
            serviceId
        }

        var message = await MessageModal.create(newMessage);

        message = await message.populate("ChatId");
        console.log("reached here succcccesssfulllly")
        return res.json(message);

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Internal Server Error' });

    }
}


//--------------------------------------------------------------------------------------------------------------------------------------------

//fetch data for particular chat

module.exports.fetchChatUsingChatId = async (req,res) => {
    try {
        const { ChatId } = req.params;

        const chats = await MessageModal.find({ChatId});

        if(!chats){
            return res.status(400).json({message:"This is chat id is Invalid"})
        }

        return res.status(200).json({chats})

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Internal Server Error' });
    }
}



//--------------------------------------------------------------------------------------------------------------------------------------------