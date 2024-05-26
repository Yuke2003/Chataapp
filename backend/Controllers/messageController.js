const Conversation = require("./../models/conversationModel");
const Message = require("./../models/messageModels");

exports.sendMessage = async (req, res, next) => {
  try {
    const { message } = req.body;
    const receiverId = req.params.id;
    const senderId = req.user.id;
    // console.log(senderId, message);

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) {
      conversation.messages.push(newMessage);
    }

    // await conversation.save();
    // await newMessage.save();

    // this will save both parallel
    await Promise.all([conversation.save(), newMessage.save()]);

    console.log(newMessage);
    res.status(201).json(newMessage);
    next();
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: err.message });
  }
};

exports.getMessage = async (req, res) => {
  try {
    const { id: usertoChatId } = req.params;
    const senderId = req.user.id;
    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, usertoChatId] },
    }).populate("messages");

    res.status(200).json(conversation.messages)

  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: err.message });
  }
};
