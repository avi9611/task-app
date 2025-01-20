import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import MyUser from '@/app/models/userModel'
import  connect  from '../../lib/db'

export async function POST(req: Request) {
  const SIGNING_SECRET = process.env.SIGNING_SECRET

  if (!SIGNING_SECRET) {
    throw new Error('Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env.local')
  }

  const wh = new Webhook(SIGNING_SECRET)

  const headerPayload = await headers()
  const svix_id = headerPayload.get('svix-id')
  const svix_timestamp = headerPayload.get('svix-timestamp')
  const svix_signature = headerPayload.get('svix-signature')

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error: Missing Svix headers', {
      status: 400,
    })
  }

  const payload = await req.json()
  const body = JSON.stringify(payload)

  let evt: WebhookEvent

  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent
  } catch (err) {
    console.error('Error: Could not verify webhook:', err)
    return new Response('Error: Verification error', {
      status: 400,
    })
  }

  const { id } = evt.data
  const eventType = evt.type

  if(eventType === "user.created"){
    const { username, id, email_addresses, first_name } = evt.data;
    console.log("first_name: " , first_name);

    const newUser = {
        clerkUserId: id, 
        userName: username || "defaultUserName",
        emailAddress: email_addresses[0].email_address,
        firstName: first_name,
      };

    try {
        await connect();
        await MyUser.create(newUser);
        console.log("user created");
    } catch (error) {
        console.error("Error creating user: ", error);
    }
  }
  console.log(`Received webhook with ID ${id} and event type of ${eventType}`)
  console.log('Webhook payload:', body)

  return new Response('Webhook received', { status: 200 })
}