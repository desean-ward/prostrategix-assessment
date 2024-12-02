import {
  AnimatedHeading,
  ChatBubbleContent,
  ChatBubbleWrapper,
} from "./chat-bubble.styles";

const ChatBubble = ({ message, isLeft, id }) => {
  return (
    <ChatBubbleWrapper id={id} $isLeft={isLeft}>
      <ChatBubbleContent $isLeft={isLeft}>{message}</ChatBubbleContent>
    </ChatBubbleWrapper>
  );
};

export default ChatBubble;
