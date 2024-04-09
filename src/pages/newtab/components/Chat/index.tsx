import MessageTab from './MessageTab';
import MessageContent from './MessageContent';

export default function Chat() {
  return (
    <div className="flex h-full ml-2">
      <div className="flex-shrink-0 h-full w-80">
        <MessageTab />
      </div>
      <div className="flex-grow">
        <MessageContent />
      </div>
    </div>
  );
}
