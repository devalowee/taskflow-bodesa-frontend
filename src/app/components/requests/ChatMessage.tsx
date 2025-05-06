export interface ChatMessageProps {
  id: string;
  message: string;
  author: string;
  createdAt: string;
  isAuthor: boolean;
  avatar: string;
}

export const ChatMessage = ({ message, author, createdAt, isAuthor, avatar }: ChatMessageProps) => {
  return (
    <div className={`flex flex-col ${isAuthor ? 'items-end' : 'items-start'}`}>
      <div className="flex items-center gap-2">
        <img src={avatar} alt={author} className="w-10 h-10 rounded-full" />
        <p className={`${ isAuthor ? 'bg-black text-white' : 'bg-gray-200'} p-2 rounded-lg`}>{message}</p>
      </div>
      <p className="text-sm text-gray-500">{createdAt}</p>
    </div>
  )
}
