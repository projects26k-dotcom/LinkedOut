import express from 'express';
import { User } from '../models/User.js';

const router = express.Router();

/**
 * @route   POST /api/users/sync
 * @desc    Sync / upsert signed-up Clerk user in MongoDB
 * @access  Public / Authenticated
 */
router.post('/sync', async (req, res) => {
  try {
    const {
      clerkId,
      email,
      firstName,
      lastName,
      fullName,
      username,
      avatar,
      title,
      company,
      bio,
      location,
    } = req.body;

    if (!clerkId) {
      return res.status(400).json({ error: 'Missing required field: clerkId' });
    }

    const updateData = {
      clerkId,
      email: email || '',
      firstName: firstName || '',
      lastName: lastName || '',
      fullName: fullName || `${firstName || ''} ${lastName || ''}`.trim(),
      username: username || '',
      avatar: avatar || '',
      updatedAt: new Date(),
    };

    if (title !== undefined && title !== null) updateData.title = title;
    if (company !== undefined && company !== null) updateData.company = company;
    if (bio !== undefined && bio !== null) updateData.bio = bio;
    if (location !== undefined && location !== null) updateData.location = location;

    // Upsert user in MongoDB
    const user = await User.findOneAndUpdate(
      { clerkId },
      { $set: updateData },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    console.log(`👤 [User Synced]: ${user.email || user.clerkId} saved to MongoDB (ID: ${user._id})`);
    return res.status(200).json({ success: true, user });
  } catch (error) {
    console.error('❌ [User Sync Error]:', error);
    return res.status(500).json({ error: 'Failed to sync user data in MongoDB', details: error.message });
  }
});

/**
 * @route   GET /api/users/:clerkId
 * @desc    Get user profile from MongoDB by Clerk ID
 */
router.get('/:clerkId', async (req, res) => {
  try {
    const user = await User.findOne({ clerkId: req.params.clerkId });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    return res.json({ success: true, user });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to retrieve user', details: error.message });
  }
});

/**
 * @route   PUT /api/users/:clerkId
 * @desc    Update user profile data in MongoDB
 */
router.put('/:clerkId', async (req, res) => {
  try {
    const { title, company, bio, location, isAnonymous } = req.body;
    const update = {};
    if (title !== undefined) update.title = title;
    if (company !== undefined) update.company = company;
    if (bio !== undefined) update.bio = bio;
    if (location !== undefined) update.location = location;
    if (isAnonymous !== undefined) update.isAnonymous = isAnonymous;
    update.updatedAt = new Date();

    const user = await User.findOneAndUpdate(
      { clerkId: req.params.clerkId },
      { $set: update },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.json({ success: true, user });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to update profile', details: error.message });
  }
});

export default router;
