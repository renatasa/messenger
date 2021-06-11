import Message from "../../components/Message/Message";
export const createMessagingSection=(data, selectedChat)=>{
    const messagingSection=[];
    if (data !== null) {
        const chat = [
          ...Object.values(data[selectedChat])[0],
        ];
        chat.map((chatItem, index) =>
          messagingSection.push(
            <Message
              author={chatItem.author}
              messageText={chatItem.messageText}
              key={index}
            />
          )
        );
      }
      return messagingSection
}