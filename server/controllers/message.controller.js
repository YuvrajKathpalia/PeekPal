import { Conversation } from "../models/conversation.model.js";
import { Message } from "../models/message.model.js";

export const sendMessage = async(req,res) =>{

    try{

        const senderId= req.id;
        const receiverId= req.params.id;

        const {message} = req.body;

        if (!message) {
            return res.status(400).json({ success: false, message: "Message cannot be empty" });
        }        

        let conversation = await Conversation.findOne({

            participants:{$all : [senderId , receiverId]}
        });

        if(!conversation){  //agar convesation ni horkhi dono ki phle se to nayi bnadenge..

            conversation = await Conversation.create({

                participants : [senderId, receiverId]
            })
        };

        const newMessage = await Message.create({   //naya message save krenge us conversation ka...

            senderId,
            receiverId,
            message
        });

        if(newMessage){     //us conversation array me message push krdenge(message ki object id)..
            conversation.messages.push(newMessage._id);
        }

            await(conversation.save());
            await(newMessage.save());

            return res.status(201).json({

                success:true,
                newMessage
            })

          
    }
    catch(error){
        console.log(error);
    }
}


export const getMessage = async (req,res) => {

    try {
        const senderId = req.id;
        const receiverId = req.params.id;

        const conversation = await Conversation.findOne({    //wo conversation dhundi dono ki , usme messages array populate krdi
            participants:{$all: [senderId, receiverId]}
        }).populate('messages');

        if(!conversation) return res.status(200).json({success:true, messages:[]});

        return res.status(200).json({success:true, messages:conversation.messages}); 
        
    } catch (error) {
        console.log(error);
    }
}