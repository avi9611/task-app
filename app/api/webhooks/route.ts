import { Webhook } from 'svix';
import { headers } from 'next/headers'; 
import { WebhookEvent } from '@clerk/nextjs/server';
import MyUser from '@/app/models/userModel';
import connect from '@/app/lib/db';

export async function POST(req: Request) {
  const SIGNING_SECRET = process.env.SIGNING_SECRET;

  if (!SIGNING_SECRET) {
    console.error('Error: SIGNING_SECRET is missing. Please add it to your environment variables.');
    return new Response('Internal Server Error: SIGNING_SECRET is missing.', {
      status: 500,
    });
  }

  const wh = new Webhook(SIGNING_SECRET);

  // Await the headers() function
  const headerPayload = await headers(); 
  const svix_id = headerPayload.get('svix-id');
  const svix_timestamp = headerPayload.get('svix-timestamp');
  const svix_signature = headerPayload.get('svix-signature');

  if (!svix_id || !svix_timestamp || !svix_signature) {
    console.error('Error: Missing Svix headers');
    return new Response('Error: Missing Svix headers', {
      status: 400,
    });
  }

  let payload;
  try {
    payload = await req.json();
  } catch (err) {
    console.error('Error: Invalid JSON payload', err);
    return new Response('Error: Invalid JSON payload', {
      status: 400,
    });
  }

  const body = JSON.stringify(payload);

  let evt: WebhookEvent;
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error('Error: Could not verify webhook:', err);
    return new Response('Error: Verification error', {
      status: 400,
    });
  }

  const { id } = evt.data;
  const eventType = evt.type;

  console.log(`Received webhook with ID ${id} and event type of ${eventType}`);
  console.log('Webhook payload:', body);

  if (eventType === 'user.created') {
    const { username, id, email_addresses, first_name } = evt.data;
    console.log('first_name:', first_name);

    const newUser = {
      clerkUserId: id,
      userName: username || 'defaultUserName',
      emailAddress: email_addresses[0].email_address,
      firstName: first_name,
    };

    try {
      await connect();
      await MyUser.create(newUser);
      console.log('User created successfully');
    } catch (error) {
      console.error('Error creating user:', error);
      return new Response('Error: Failed to create user in the database', {
        status: 500,
      });
    }
  }

  return new Response('Webhook received', { status: 200 });
}