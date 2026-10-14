import React, { useState } from 'react';
import { FaUserSecret, FaSignInAlt } from 'react-icons/fa';
import { useUser, useClerk } from '@clerk/react';
import { useApp } from '../context/AppContext';

export const CommentSection = ({ postId, comments = [] }) => {
  const { addComment } = useApp();
  const { user, isSignedIn } = useUser();
  const { openSignIn } = useClerk();

  const [commentText, setCommentText] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);

  // User details
  const authorName = isSignedIn && user 
    ? (user.fullName || user.firstName || user.username || user.primaryEmailAddress?.emailAddress?.split('@')[0] || 'Employee')
    : 'Guest Employee';

  const authorAvatar = isSignedIn && user 
    ? user.imageUrl 
    : null;

  const authorTitle = isSignedIn && user?.unsafeMetadata?.title 
    ? String(user.unsafeMetadata.title) 
    : 'Employee';

  const handleInputFocus = () => {
    if (!isSignedIn) {
      if (openSignIn) openSignIn();
    }
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!isSignedIn) {
      if (openSignIn) openSignIn();
      return;
    }

    if (!commentText.trim()) return;

    addComment(postId, commentText.trim(), isAnonymous, {
      name: authorName,
      avatar: authorAvatar,
      title: authorTitle
    });
    setCommentText('');
  };

  return (
    <div className="pt-3 border-t border-gray-100 dark:border-gray-800 space-y-3 bg-gray-50/70 dark:bg-gray-800/40 p-3 -mx-4 -mb-4 rounded-b-xl">
      {/* Add Comment Input Form */}
      <form onSubmit={handleCommentSubmit} className="space-y-2">
        <div className="flex gap-2 items-start">
          <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 bg-gray-200 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 flex items-center justify-center">
            {isAnonymous || !authorAvatar ? (
              <FaUserSecret className="text-gray-700 dark:text-gray-300 text-sm" />
            ) : (
              <img src={authorAvatar} alt={authorName} className="w-full h-full object-cover" />
            )}
          </div>

          <div className="flex-1 relative">
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              onFocus={handleInputFocus}
              onClick={!isSignedIn ? handleInputFocus : undefined}
              placeholder={
                !isSignedIn 
                  ? "Sign in to join the conversation and comment..." 
                  : (isAnonymous ? "Add an anonymous snarky comment..." : "Add a comment...")
              }
              className="w-full bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 text-xs px-3 py-2 pr-16 rounded-full border border-gray-300 dark:border-gray-700 focus:outline-none focus:border-coral-500 shadow-2xs placeholder:text-gray-400 dark:placeholder:text-gray-500"
            />
            
            {!isSignedIn ? (
              <button
                type="button"
                onClick={() => openSignIn?.()}
                className="absolute right-1.5 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-full text-xs font-bold bg-coral-500 text-white hover:bg-coral-600 shadow-2xs flex items-center gap-1"
              >
                <FaSignInAlt className="text-[10px]" /> Sign In
              </button>
            ) : (
              <button
                type="submit"
                disabled={!commentText.trim()}
                className={`
                  absolute right-1.5 top-1/2 -translate-y-1/2 px-3 py-1 rounded-full text-xs font-bold transition-all
                  ${commentText.trim() 
                    ? 'bg-coral-500 text-white hover:bg-coral-600 shadow-xs cursor-pointer' 
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed'}
                `}
              >
                Reply
              </button>
            )}
          </div>
        </div>

        {/* Anonymous comment checkbox toggle */}
        {isSignedIn && (
          <div className="flex items-center justify-between pl-10 text-[11px] text-gray-500 dark:text-gray-400">
            <label className="flex items-center gap-1.5 cursor-pointer hover:text-gray-700 dark:hover:text-gray-300">
              <input
                type="checkbox"
                checked={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.checked)}
                className="rounded text-coral-500 focus:ring-coral-400 w-3.5 h-3.5"
              />
              <span className="flex items-center gap-1">
                <FaUserSecret className="text-gray-500 dark:text-gray-400" /> Post comment anonymously
              </span>
            </label>
            <span className="text-gray-400 text-[10px]">Press Enter to send</span>
          </div>
        )}
      </form>

      {/* Comments List */}
      {comments.length > 0 ? (
        <div className="space-y-2.5 pt-1">
          {comments.map((comment) => (
            <div key={comment.id} className="flex gap-2.5 items-start text-xs">
              <div className="w-7 h-7 rounded-full overflow-hidden flex-shrink-0 bg-gray-200 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 flex items-center justify-center text-xs">
                {comment.isAnonymous || !comment.author?.avatar ? (
                  <FaUserSecret className="text-gray-600 dark:text-gray-300" />
                ) : (
                  <img 
                    src={comment.author.avatar} 
                    alt={comment.author.name} 
                    className="w-full h-full object-cover" 
                  />
                )}
              </div>

              <div className="flex-1 bg-white dark:bg-gray-900 p-2.5 rounded-xl border border-gray-200 dark:border-gray-800 shadow-2xs">
                <div className="flex items-center justify-between mb-1">
                  <div>
                    <span className="font-bold text-gray-900 dark:text-white text-xs">
                      {comment.isAnonymous ? 'Anonymous Employee' : comment.author?.name}
                    </span>
                    {comment.author?.title && !comment.isAnonymous && (
                      <span className="text-[10px] text-gray-400 dark:text-gray-500 ml-1.5 font-normal">
                        • {comment.author.title}
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-gray-400">{comment.createdAt}</span>
                </div>
                <p className="text-gray-700 dark:text-gray-300 text-xs leading-relaxed">{comment.text}</p>
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
