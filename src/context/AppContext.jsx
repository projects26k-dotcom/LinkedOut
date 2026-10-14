import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_POSTS, INITIAL_USER, CATEGORIES } from '../data/mockPosts';
import { NOTIFICATIONS } from '../data/mockSidebarData';

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(INITIAL_USER);
  const [posts, setPosts] = useState(() => {
    const saved = localStorage.getItem('linkedout_posts');
    return saved ? JSON.parse(saved) : INITIAL_POSTS;
  });
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('recent'); // 'recent', 'top', 'debated'
  const [toasts, setToasts] = useState([]);
  const [notifications, setNotifications] = useState(NOTIFICATIONS);
  const [unreadNotifications, setUnreadNotifications] = useState(2);
  const [isGuidelinesOpen, setIsGuidelinesOpen] = useState(false);

  // Sync posts to localStorage for persistent fun
  useEffect(() => {
    localStorage.setItem('linkedout_posts', JSON.stringify(posts));
  }, [posts]);

  // Toast helper
  const addToast = (message, type = 'info', icon = null) => {
    const id = Date.now() + Math.random().toString(36).substring(2, 5);
    const newToast = { id, message, type, icon };
    setToasts(prev => [...prev, newToast]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3500);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Add Post
  const addPost = ({ content, category, isAnonymous, authorDetails = null }) => {
    const newPost = {
      id: `post-${Date.now()}`,
      author: isAnonymous ? {
        name: 'Anonymous Employee',
        title: 'Incognito Corporate Rebel',
        company: 'Confidential Enterprise',
        avatar: null,
      } : {
        name: authorDetails?.name || currentUser.name,
        title: authorDetails?.title || currentUser.title,
        company: authorDetails?.company || currentUser.company,
        avatar: authorDetails?.avatar || currentUser.avatar,
        isCurrentUser: true,
      },
      isAnonymous: Boolean(isAnonymous),
      createdAt: 'Just now',
      timestamp: Date.now(),
      category: category || 'Funny Thought',
      content: content.trim(),
      likesCount: 1, // Author automatically laughs at their own post
      commentsCount: 0,
      sharesCount: 0,
      hasLiked: true,
      isSaved: false,
      comments: []
    };

    setPosts(prev => [newPost, ...prev]);
    setCurrentUser(prev => ({
      ...prev,
      postCount: prev.postCount + 1,
      quietQuittingScore: Math.min(100, prev.quietQuittingScore + 1)
    }));

    addToast(
      isAnonymous ? 'Posted anonymously to the office wire! 🕵️' : 'Post published to LinkedOut! 🚀',
      'success'
    );
  };

  // Like / Laugh Toggle
  const toggleLike = (postId) => {
    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        const nextHasLiked = !post.hasLiked;
        return {
          ...post,
          hasLiked: nextHasLiked,
          likesCount: nextHasLiked ? post.likesCount + 1 : Math.max(0, post.likesCount - 1)
        };
      }
      return post;
    }));
  };

  // Add Comment
  const addComment = (postId, text, isAnonymous = false, authorDetails = null) => {
    if (!text || !text.trim()) return;

    const newComment = {
      id: `comment-${Date.now()}`,
      author: isAnonymous ? {
        name: 'Anonymous Employee',
        title: 'Unfiltered Colleague',
        avatar: null
      } : {
        name: authorDetails?.name || currentUser.name,
        title: authorDetails?.title || currentUser.title,
        avatar: authorDetails?.avatar || currentUser.avatar
      },
      isAnonymous,
      createdAt: 'Just now',
      text: text.trim()
    };

    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          commentsCount: post.commentsCount + 1,
          comments: [...(post.comments || []), newComment]
        };
      }
      return post;
    }));

    addToast('Comment added to thread! 💬', 'info');
  };

  // Toggle Save Post
  const toggleSave = (postId) => {
    let willBeSaved = false;
    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        willBeSaved = !post.isSaved;
        return {
          ...post,
          isSaved: willBeSaved
        };
      }
      return post;
    }));

    addToast(
      willBeSaved ? 'Saved to your secret bookmarks! 🔖' : 'Removed from bookmarks ❌',
      'info'
    );
  };

  // Share Post
  const sharePost = (postId) => {
    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        return { ...post, sharesCount: post.sharesCount + 1 };
      }
      return post;
    }));

    const url = `${window.location.origin}/post/${postId}`;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url)
        .then(() => addToast('Post link copied to clipboard! Share the laugh 😂', 'success'))
        .catch(() => addToast('Link ready to share! 📋', 'success'));
    } else {
      addToast('Post link ready! 📋', 'success');
    }
  };

  // Mark all notifications read
  const markNotificationsRead = () => {
    setUnreadNotifications(0);
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  // Derived filtered & searched posts
  const filteredPosts = posts.filter(post => {
    // Category filter
    if (activeCategory === 'saved') {
      if (!post.isSaved) return false;
    } else if (activeCategory !== 'all') {
      if (post.category !== activeCategory) return false;
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchContent = post.content.toLowerCase().includes(q);
      const matchAuthor = post.author.name.toLowerCase().includes(q);
      const matchCategory = post.category.toLowerCase().includes(q);
      const matchCompany = (post.author.company || '').toLowerCase().includes(q);
      return matchContent || matchAuthor || matchCategory || matchCompany;
    }

    return true;
  }).sort((a, b) => {
    if (sortBy === 'top') {
      return b.likesCount - a.likesCount;
    }
    if (sortBy === 'debated') {
      return b.commentsCount - a.commentsCount;
    }
    // recent
    return (b.timestamp || 0) - (a.timestamp || 0);
  });

  const savedPostsCount = posts.filter(p => p.isSaved).length;

  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        posts,
        filteredPosts,
        savedPostsCount,
        activeCategory,
        setActiveCategory,
        searchQuery,
        setSearchQuery,
        sortBy,
        setSortBy,
        toasts,
        addToast,
        removeToast,
        addPost,
        toggleLike,
        addComment,
        toggleSave,
        sharePost,
        notifications,
        unreadNotifications,
        markNotificationsRead,
        isGuidelinesOpen,
        setIsGuidelinesOpen,
        categories: CATEGORIES,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
