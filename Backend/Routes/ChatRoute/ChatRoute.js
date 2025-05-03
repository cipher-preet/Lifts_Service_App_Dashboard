const express = require("express");
const router = express.Router();

const chatController = require("../../Controllers/ChatController/ChatController");


router.post('/createChat', chatController.CreateChat);

router.post('/sendMessage', chatController.sendMessage);

router.get('/getChatMessages/:ChatId', chatController.fetchChatUsingChatId);


module.exports = router;