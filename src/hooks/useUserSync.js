import { useEffect, useRef } from 'react';
import { useUser } from '@clerk/react';

/**
 * Custom hook to automatically sync signed-up / logged-in Clerk user details
 * to the MongoDB database via the /api/users/sync backend endpoint.
 */
export const useUserSync = () => {
  const { user, isSignedIn, isLoaded } = useUser();
  const syncedKeyRef = useRef(null);

  useEffect(() => {
    if (!isLoaded || !isSignedIn || !user) return;

    const userPayload = {
      clerkId: user.id,
      email: user.primaryEmailAddress?.emailAddress || user.emailAddresses?.[0]?.emailAddress || '',
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      fullName: user.fullName || `${user.firstName || ''} ${user.lastName || ''}`.trim(),
      username: user.username || '',
      avatar: user.imageUrl || '',
      title: user.unsafeMetadata?.title || 'Employee',
      company: user.unsafeMetadata?.company || 'Company not set',
      bio: user.unsafeMetadata?.bio || '',
      location: user.unsafeMetadata?.location || '',
    };

    // Prevent duplicate sync calls in the same session
    const currentKey = `${user.id}-${user.updatedAt || ''}-${userPayload.title}-${userPayload.company}`;
    if (syncedKeyRef.current === currentKey) return;

    const syncToDatabase = async () => {
      try {
        const res = await fetch('/api/users/sync', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userPayload),
        });

        if (res.ok) {
          const data = await res.json();
          syncedKeyRef.current = currentKey;
          console.log('✅ [MongoDB Sync]: User profile successfully saved to MongoDB:', data.user?.email || user.id);
        }
      } catch (err) {
        console.warn('⚠️ [MongoDB Sync]: Backend API unreachable. Ensure backend server is running (`npm run server`):', err.message);
      }
    };

    syncToDatabase();
  }, [user, isSignedIn, isLoaded]);
};
