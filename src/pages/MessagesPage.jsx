import React, { useState } from 'react';
import { MOCK_MESSAGES } from '../data/mockSidebarData';
import { FaUserSecret, FaPaperPlane, FaComments } from 'react-icons/fa';
import { LeftSidebar } from '../components/LeftSidebar';

export const MessagesPage = () => {
  const [chats, setChats] = useState(MOCK_MESSAGES);
  const [activeChatId, setActiveChatId] = useState('chat-1');
  const [replyText, setReplyText] = useState('');

  const activeChat = chats.find(c => c.id === activeChatId) || chats[0];

  const handleSend = (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    const newMessage = {
      sender: 'me',
      text: replyText.trim(),
      time: 'Just now'
    };

    setChats(prev => prev.map(chat => {
      if (chat.id === activeChatId) {
        return {
          ...chat,
          conversation: [...chat.conversation, newMessage],
          lastMessage: replyText.trim(),
          time: 'Just now'
        };
      }
      return chat;
    }));

    setReplyText('');

    setTimeout(() => {
      const satiricalReplies = [
        "Per my previous message, I am 100% taking this offline.",
        "Could we align on a high-level roadmap before addressing that?",
        "I am currently in 6 simultaneous meetings, typing this with my nose.",
        "That's outside my current bandwidth sprint cycle.",
        "Approved, provided we don't tell HR."
      ];
      const randomReply = satiricalReplies[Math.floor(Math.random() * satiricalReplies.length)];

      setChats(prev => prev.map(chat => {
        if (chat.id === activeChatId) {
          return {
            ...chat,
            conversation: [
              ...chat.conversation,
              { sender: 'them', text: randomReply, time: 'Just now' }
            ],
            lastMessage: randomReply,
            time: 'Just now'
          };
        }
        return chat;
      }));
    }, 1200);
  };

  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-6 items-start">
        
        {/* Left Sidebar (Desktop) */}
        <div className="hidden md:block md:col-span-4 lg:col-span-3 sticky top-18">
          <LeftSidebar />
        </div>

        {/* Messaging Container */}
        <main className="col-span-1 md:col-span-8 lg:col-span-9 bg-white dark:bg-gray-900 rounded-2xl shadow-card border border-gray-200 dark:border-gray-800 overflow-hidden flex flex-col md:flex-row h-[75vh] min-h-[500px] transition-colors">
          
          {/* Chat List Column */}
          <div className="w-full md:w-80 border-r border-gray-200 dark:border-gray-800 flex flex-col bg-gray-50/50 dark:bg-gray-950/40">
            <div className="p-3.5 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
              <h2 className="font-bold text-gray-900 dark:text-white text-sm flex items-center gap-2">
                <FaComments className="text-coral-500" /> Watercooler DMs
              </h2>
              <p className="text-[11px] text-gray-500 dark:text-gray-400">Unmonitored corporate whispers</p>
            </div>

            <div className="overflow-y-auto flex-1 divide-y divide-gray-100 dark:divide-gray-800">
              {chats.map(chat => {
                const isActive = chat.id === activeChatId;
                return (
                  <button
                    key={chat.id}
                    type="button"
                    onClick={() => setActiveChatId(chat.id)}
                    className={`w-full text-left p-3 flex items-start gap-3 transition-colors ${
                      isActive ? 'bg-coral-50/80 dark:bg-coral-950/50 border-l-4 border-coral-500' : 'hover:bg-white dark:hover:bg-gray-800'
                    }`}
                  >
                    <div className="relative">
                      {chat.user.avatar ? (
                        <img 
                          src={chat.user.avatar} 
                          alt={chat.user.name} 
                          className="w-10 h-10 rounded-full object-cover border border-gray-200 dark:border-gray-700" 
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-gray-800 text-white flex items-center justify-center text-base">
                          <FaUserSecret />
                        </div>
                      )}
                      {chat.user.online && (
                        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white dark:border-gray-900 rounded-full" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center mb-0.5">
                        <span className="font-semibold text-xs text-gray-900 dark:text-white truncate">
                          {chat.user.name}
                        </span>
                        <span className="text-[10px] text-gray-400 dark:text-gray-500">{chat.time}</span>
                      </div>
                      <p className="text-[11px] text-gray-500 dark:text-gray-400 truncate">{chat.lastMessage}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Conversation Column */}
          <div className="flex-1 flex flex-col bg-white dark:bg-gray-900 h-full">
            {/* Chat Header */}
            <div className="p-3.5 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between bg-white dark:bg-gray-900">
              <div className="flex items-center gap-2.5">
                {activeChat.user.avatar ? (
                  <img src={activeChat.user.avatar} alt={activeChat.user.name} className="w-9 h-9 rounded-full object-cover" />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-gray-800 text-white flex items-center justify-center text-sm">
                    <FaUserSecret />
                  </div>
                )}
                <div>
                  <h3 className="font-bold text-xs text-gray-900 dark:text-white">{activeChat.user.name}</h3>
                  <p className="text-[10px] text-gray-400 dark:text-gray-500">{activeChat.user.role}</p>
                </div>
              </div>
              <span className="text-[10px] bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 rounded-full font-semibold border border-emerald-200 dark:border-emerald-800">
                End-to-end unsynchronized
              </span>
            </div>

            {/* Message Thread History */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#fdfdfd] dark:bg-gray-950/60">
              {activeChat.conversation.map((msg, i) => {
                const isMe = msg.sender === 'me';
                return (
                  <div key={i} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                    <div className={`max-w-[75%] p-3 rounded-2xl text-xs leading-relaxed ${
                      isMe 
                        ? 'bg-coral-500 text-white rounded-br-xs shadow-xs' 
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-bl-xs border border-gray-200 dark:border-gray-700'
                    }`}>
                      {msg.text}
                    </div>
                    <span className="text-[9px] text-gray-400 dark:text-gray-500 mt-0.5 px-1">{msg.time}</span>
                  </div>
                );
              })}
            </div>

            {/* Input Message Form */}
            <form onSubmit={handleSend} className="p-3 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 flex items-center gap-2">
              <input
                type="text"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Type a corporate secret or complaint..."
                className="flex-1 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-xs px-3.5 py-2.5 rounded-full border border-gray-200 dark:border-gray-700 focus:outline-none focus:border-coral-400"
              />
              <button
                type="submit"
                disabled={!replyText.trim()}
                className={`w-9 h-9 rounded-full flex items-center justify-center text-white transition-all ${
                  replyText.trim() ? 'bg-coral-500 hover:bg-coral-600 cursor-pointer shadow-xs' : 'bg-gray-200 dark:bg-gray-800 text-gray-400 cursor-not-allowed'
                }`}
              >
                <FaPaperPlane className="text-xs" />
              </button>
            </form>
          </div>

        </main>

      </div>
    </div>
  );
};
