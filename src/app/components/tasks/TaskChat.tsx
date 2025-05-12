import { MessageCircle } from 'lucide-react'
import { ChatMessage, ChatMessageProps } from './ChatMessage'

interface TaskChatProps {
  messages: ChatMessageProps[];
}

export const TaskChat = ({ messages = [] }: TaskChatProps) => {
  return (
    <section className='min-w-[450px] border border-gray-300 rounded-lg p-4'>
      <header className="flex items-center gap-2 p-2">
        <MessageCircle size={30} />
        <h2 className='text-2xl font-semibold'>Conversación</h2>
      </header>
      <div className="flex flex-col gap-4 p-2">
        { messages.map((message) => (
          <ChatMessage key={message.id} {...message} />
        )) }
      </div>
    </section>
  )
}
