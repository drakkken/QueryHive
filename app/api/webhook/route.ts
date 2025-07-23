import { Webhook } from "svix";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { createUser, deleteUser, updateUser } from "@/lib/Actions/UserAction";

const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET || "";

export async function POST(req: Request) {
  const payload = await req.text();
  const headerPayload = headers(); // Add await here

  const heads = {
    "svix-id": headerPayload.get("svix-id") || "",
    "svix-timestamp": headerPayload.get("svix-timestamp") || "",
    "svix-signature": headerPayload.get("svix-signature") || "",
  };

  const svix = new Webhook(WEBHOOK_SECRET);
  let evt: any;

  try {
    evt = svix.verify(payload, heads);
  } catch (err) {
    console.error("Webhook verification failed", err);
    return new NextResponse("Webhook verification failed", { status: 400 });
  }

  const eventType = evt.type;
  const eventData = evt.data;
  const { id } = evt.id;
  console.log("🔔 Clerk webhook received:", eventType, eventData);

  if (eventType === "user.created") {
    const { id, email_addresses, image_url, username, firstname, lastname } =
      evt.data;
    // make a new user in dbd
    const prismaUser = await createUser({
      clerkId: id,
      name: `${firstname}${lastname ? ` ${lastname}` : ""}`,
      username: username!,
      email: email_addresses[0].email_address,
      picture: image_url,
    });
    return NextResponse.json({ message: "OK", user: prismaUser });
  }

  if (eventType === "user.updated") {
    const { id, email_addresses, image_url, username, firstname, lastname } =
      evt.data;
    // make a new user in dbd
    const prismaUser = await updateUser({
      clerkId: id,
      updateData: {
        name: `${firstname}${lastname ? ` ${lastname}` : ""}`,
        username: username!,
        email: email_addresses[0].email_address,
        picture: image_url,
      },
      path: `/profile/${id}`,
    });
    return NextResponse.json({ message: "OK", user: prismaUser });
  }
  if (eventType === "user.deleted") {
    const { id } = evt.data;
    // make a new user in dbd

    const prismaUser = await deleteUser({
      clerkId: id,
    });
    return NextResponse.json({ message: "OK", user: prismaUser });
  }
}
