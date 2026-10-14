import React, { useState } from 'react';
import { FaUserSecret, FaPaperPlane, FaUserCircle } from 'react-icons/fa';
import { useApp } from '../context/AppContext';

export const CommentSection = ({ postId, comments = [] }) => {
  const { addComment, currentUser } = useApp();
  const [commentText, setCommentText] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    addComment(postId, commentText.trim(), isAnonymous);
    setCommentText('');
  };

  return (
    <div className="pt-3 border-t border-gray-100 space-y-3 bg-gray-50/70 p-3 -mx-4 -mb-4 rounded-b-xl">
      {/* Add Comment Input Form */}
      <form onSubmit={handleCommentSubmit} className="space-y-2">
        <div className="flex gap-2 items-start">
          <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 bg-gray-200 border border-gray-300 flex items-center justify-center">
            {isAnonymous ? (
              <FaUserSecret className="text-gray-700 text-sm" />
            ) : (
              <img src={currentUser.avatar} alt="You" className="w-full h-full object-cover" />
            )}
          </div>

          <div className="flex-1 relative">
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder={isAnonymous ? "Add an anonymous snarky comment..." : "Add a comment..."}
              className="w-full bg-white text-gray-900 text-xs px-3 py-2 pr-16 rounded-full border border-gray-300 focus:outline-none focus:border-coral-500 shadow-2xs"
            />
            <button
              type="submit"
              disabled={!commentText.trim()}
              className={`
                absolute right-1.5 top-1/2 -translate-y-1/2 px-3 py-1 rounded-full text-xs font-bold transition-all
                ${commentText.trim() 
                  ? 'bg-coral-500 text-white hover:bg-coral-600 shadow-xs cursor-pointer' 
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'}
              `}
            >
              Reply
            </button>
          </div>
        </div>

        {/* Anonymous comment checkbox toggle */}
        <div className="flex items-center justify-between pl-10 text-[11px] text-gray-500">
          <label className="flex items-center gap-1.5 cursor-pointer hover:text-gray-700">
            <input
              type="checkbox"
              checked={isAnonymous}
              onChange={(e) => setIsAnonymous(e.target.checked)}
              className="rounded text-coral-500 focus:ring-coral-400 w-3.5 h-3.5"
            />
            <span className="flex items-center gap-1">
              <FaUserSecret className="text-gray-500" /> Post comment anonymously
            </span>
          </label>
          <span className="text-gray-400 text-[10px]">Press Enter to send</span>
        </div>
      </form>

      {/* Comments List */}
      {comments.length > 0 ? (
        <div className="space-y-2.5 pt-1">
          {comments.map((comment) => (
            <div key={comment.id} className="flex gap-2.5 items-start text-xs">
              <div className="w-7 h-7 rounded-full overflow-hidden flex-shrink-0 bg-gray-200 border border-gray-300 flex items-center justify-center text-xs">
                {comment.isAnonymous || !comment.author?.avatar ? (
                  <FaUserSecret className="text-gray-600" />
                ) : (
                  <img 
                    src={comment.author.avatar} 
                    alt={comment.author.name} 
                    className="w-full h-full object-cover" 
                  />
                )}
              </div>

              <div className="flex-1 bg-white p-2.5 rounded-xl border border-gray-200 shadow-2xs">
                <div className="flex items-center justify-between mb-1">
                  <div>
                    <span className="font-bold text-gray-900 text-xs">
                      {comment.isAnonymous ? 'Anonymous Employee' : comment.author?.name}
                    </span>
                    {comment.author?.title && !comment.isAnonymous && (
                      <span className="text-[10px] text-gray-400 ml-1.5 font-normal">
                        • {comment.author.title}
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-gray-400">{comment.createdAt}</span>
                </div>
                <p className="text-gray-700 text-xs leading-relaxed">{comment.text}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-[11px] text-gray-400 py-1 italic">
          No comments yet. Be the first to add some office tea! ☕
        </p>
      )}
    </div>
  );
};
