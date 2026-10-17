import express from 'express';
import { Webhook } from 'svix';
import { User } from '../models/User.js';

const router = express.Router();

/**
 * @route   POST /api/webhooks/clerk
 * @desc    Receive Clerk webhook events (user.created, user.updated, user.deleted)
 * @access  Public (protected by Svix signature verification)
 */
router.post(
  '/clerk',
  express.raw({ type: 'application/json' }),
  async (req, res) => {
    const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

    if (!WEBHOOK_SECRET) {
      console.warn('⚠️ [Clerk Webhook Warning]: CLERK_WEBHOOK_SECRET is not configured in .env.local');
      return res.status(500).json({ error: 'Server missing CLERK_WEBHOOK_SECRET configuration' });
    }

    const svix_id = req.headers['svix-id'];
    const svix_timestamp = req.headers['svix-timestamp'];
    const svix_signature = req.headers['svix-signature'];

    if (!svix_id || !svix_timestamp || !svix_signature) {
      return res.status(400).json({ error: 'Missing required svix headers' });
    }

    let payload = req.body;
    if (Buffer.isBuffer(payload)) {
      payload = payload.toString('utf8');
    }

    const wh = new Webhook(WEBHOOK_SECRET);
    let evt;

    try {
      evt = wh.verify(payload, {
        'svix-id': svix_id,
        'svix-timestamp': svix_timestamp,
        'svix-signature': svix_signature,
      });
    } catch (err) {
      console.error('❌ [Webhook Signature Verification Failed]:', err.message);
      return res.status(400).json({ error: 'Invalid webhook signature' });
    }

    const eventType = evt.type;
    console.log(`🔔 [Clerk Webhook Event]: ${eventType}`);

    try {
      if (eventType === 'user.created' || eventType === 'user.updated') {
        const { id, email_addresses, first_name, last_name, image_url, username, unsafe_metadata } = evt.data;
        const primaryEmail = email_addresses?.[0]?.email_address || '';

        const updateData = {
          clerkId: id,
          email: primaryEmail,
          firstName: first_name || '',
          lastName: last_name || '',
          fullName: `${first_name || ''} ${last_name || ''}`.trim() || username || 'Employee',
          avatar: image_url || '',
          username: username || '',
          title: unsafe_metadata?.title || 'Employee',
          company: unsafe_metadata?.company || 'Company not set',
          bio: unsafe_metadata?.bio || '',
          location: unsafe_metadata?.location || '',
          updatedAt: new Date(),
        };

        const user = await User.findOneAndUpdate(
          { clerkId: id },
          { $set: updateData },
          { upsert: true, new: true, setDefaultsOnInsert: true }
        );

        console.log(`✅ [MongoDB Webhook Sync]: User ${user.email || id} successfully saved in MongoDB.`);
      } else if (eventType === 'user.deleted') {
        const { id } = evt.data;
        await User.findOneAndDelete({ clerkId: id });
        console.log(`🗑️ [MongoDB Webhook Sync]: User ${id} deleted from database.`);
      }

      return res.status(200).json({ success: true, message: 'Webhook processed successfully' });
    } catch (dbError) {
      console.error('❌ [Database Webhook Processing Error]:', dbError);
      return res.status(500).json({ error: 'Internal database processing error' });
    }
  }
);

export default router;
