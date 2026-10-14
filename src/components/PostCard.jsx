import React, { useState } from 'react';
import { 
  FaLaughSquint, 
  FaRegLaughSquint, 
  FaRegCommentDots, 
  FaShareSquare, 
  FaBookmark, 
  FaRegBookmark, 
  FaUserSecret, 
  FaCheck,
  FaEllipsisH
} from 'react-icons/fa';
import { useApp } from '../context/AppContext';
import { CommentSection } from './CommentSection';

export const PostCard = ({ post }) => {
  const { toggleLike, toggleSave, sharePost } = useApp();
  const [showComments, setShowComments] = useState(false);
  const [hasCopied, setHasCopied] = useState(false);

  const getCategoryBadge = (cat) => {
    switch (cat) {
      case 'Office Gossip':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'Meeting Fails':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'Boss Memes':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Salary Talk':
        return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'Funny Thought':
      default:
        return 'bg-coral-100 text-coral-700 border-coral-200';
    }
  };

  const handleShare = () => {
    sharePost(post.id);
    setHasCopied(true);
    setTimeout(() => setHasCopied(false), 2000);
  };

  return (
    <article className="bg-white rounded-xl shadow-card border border-gray-200 p-4 transition-all duration-200 hover:shadow-card-hover group">
      {/* Top Author Row */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex items-center gap-3">
          {/* Avatar or Anonymous Ghost Icon */}
          <div className="relative">
            {post.isAnonymous || !post.author?.avatar ? (
              <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-gray-800 to-gray-700 text-white flex items-center justify-center text-lg shadow-sm border border-gray-600">
                <FaUserSecret />
              </div>
            ) : (
              <img 
                src={post.author.avatar} 
                alt={post.author.name} 
                className="w-11 h-11 rounded-full object-cover border border-coral-200"
              />
            )}
            {post.isAnonymous && (
              <span className="absolute -bottom-1 -right-1 bg-coral-500 text-white text-[9px] px-1 py-0.2 rounded-full font-bold shadow-xs">
                Anon
              </span>
            )}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-gray-900 text-sm hover:underline cursor-pointer">
                {post.isAnonymous ? 'Anonymous Employee' : post.author?.name}
              </span>
              {post.isAnonymous && (
                <span className="text-[10px] text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded border border-gray-200">
                  Verified Coworker 🕵️
                </span>
              )}
            </div>
            
            <p className="text-xs text-gray-500 line-clamp-1">
              {post.author?.title} {post.author?.company ? `• ${post.author.company}` : ''}
            </p>

            <div className="flex items-center gap-2 text-[11px] text-gray-400 mt-0.5">
              <span>{post.createdAt}</span>
              <span>•</span>
              <span className={`px-2 py-0.2 text-[10px] font-semibold rounded-full border ${getCategoryBadge(post.category)}`}>
                {post.category}
              </span>
            </div>
          </div>
        </div>

        {/* Bookmark quick toggle on top right */}
        <button
          type="button"
          onClick={() => toggleSave(post.id)}
          className={`p-1.5 rounded-lg transition-colors ${
            post.isSaved 
              ? 'text-coral-500 hover:bg-coral-50' 
              : 'text-gray-400 hover:text-coral-500 hover:bg-gray-100'
          }`}
          title={post.isSaved ? "Saved in bookmarks" : "Save post"}
          aria-label={post.isSaved ? "Unsave post" : "Save post"}
        >
          {post.isSaved ? <FaBookmark className="w-4 h-4" /> : <FaRegBookmark className="w-4 h-4" />}
        </button>
      </div>

      {/* Post Text Content */}
      <div className="text-gray-800 text-sm leading-relaxed whitespace-pre-line my-3">
        {post.content}
      </div>

      {/* Engagement Stats Count Row */}
      <div className="flex items-center justify-between text-xs text-gray-500 py-2 border-b border-gray-100">
        <div className="flex items-center gap-1.5">
          <span className="flex items-center justify-center w-5 h-5 rounded-full bg-coral-100 text-coral-600 text-xs">
            😂
          </span>
          <span className="font-medium text-gray-600">
            {post.likesCount} {post.likesCount === 1 ? 'laugh' : 'laughs'}
          </span>
        </div>

        <div className="flex items-center gap-3 text-gray-400 text-[11px]">
          <button 
            type="button" 
            onClick={() => setShowComments(!showComments)}
            className="hover:underline hover:text-gray-600"
          >
            {post.commentsCount} {post.commentsCount === 1 ? 'comment' : 'comments'}
          </button>
          <span>•</span>
          <span>{post.sharesCount} shares</span>
        </div>
      </div>

      {/* Interactive Actions Row */}
      <div className="grid grid-cols-4 gap-1 pt-1 text-xs font-semibold text-gray-600">
        {/* Laugh Button */}
        <button
          type="button"
          onClick={() => toggleLike(post.id)}
          className={`
            flex items-center justify-center gap-1.5 py-2 rounded-lg transition-colors select-none
            ${post.hasLiked 
              ? 'text-coral-600 bg-coral-50/70 font-bold' 
              : 'hover:bg-gray-100 hover:text-coral-600'}
          `}
        >
          <FaLaughSquint className={`text-base ${post.hasLiked ? 'text-coral-500 scale-110' : ''} transition-transform`} />
          <span>{post.hasLiked ? 'Haha!' : 'Laugh'}</span>
        </button>

        {/* Comment Button */}
        <button
          type="button"
          onClick={() => setShowComments(!showComments)}
          className={`
            flex items-center justify-center gap-1.5 py-2 rounded-lg transition-colors select-none
            ${showComments ? 'text-coral-600 bg-gray-100' : 'hover:bg-gray-100 hover:text-coral-600'}
          `}
        >
          <FaRegCommentDots className="text-base" />
          <span>Comment</span>
        </button>

        {/* Share Button */}
        <button
          type="button"
          onClick={handleShare}
          className="flex items-center justify-center gap-1.5 py-2 rounded-lg hover:bg-gray-100 hover:text-coral-600 transition-colors select-none"
        >
          {hasCopied ? (
            <>
              <FaCheck className="text-base text-emerald-500" />
              <span className="text-emerald-600">Copied!</span>
            </>
          ) : (
            <>
              <FaShareSquare className="text-base" />
              <span>Share</span>
            </>
          )}
        </button>

        {/* Save Button */}
        <button
          type="button"
          onClick={() => toggleSave(post.id)}
          className={`
            flex items-center justify-center gap-1.5 py-2 rounded-lg transition-colors select-none
            ${post.isSaved 
              ? 'text-coral-600 bg-coral-50/70 font-bold' 
              : 'hover:bg-gray-100 hover:text-coral-600'}
          `}
        >
          {post.isSaved ? <FaBookmark className="text-base text-coral-500" /> : <FaRegBookmark className="text-base" />}
          <span>{post.isSaved ? 'Saved' : 'Save'}</span>
        </button>
      </div>

      {/* Expandable Comment Section */}
      {showComments && (
        <div className="mt-2">
          <CommentSection postId={post.id} comments={post.comments} />
        </div>
      )}
    </article>
  );
};
