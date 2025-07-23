import { Webhook } from "svix";
import { NextRequest, NextResponse } from "next/server";
import { createUser, deleteUser, updateUser } from "@/lib/Actions/UserAction";

const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET || "";

export async function POST(req: NextRequest) {
  try {
    const payload = await req.text();
    const headers = Object.fromEntries(req.headers); // Access headers from req

    const heads = {
      "svix-id": headers["svix-id"] || "",
      "svix-timestamp": headers["svix-timestamp"] || "",
      "svix-signature": headers["svix-signature"] || "",
    };

    const svix = new Webhook(WEBHOOK_SECRET);
    let evt: any;

    try {
      evt = svix.verify(payload, heads);
    } catch (err) {
      console.error("Webhook verification failed", err);
      return NextResponse.json(
        { message: "Webhook verification failed" },
        { status: 400 }
      );
    }

    const eventType = evt.type;
    const eventData = evt.data;
    const { id } = evt.data; // Note: You had evt.id, but it should be evt.data.id
    console.log("🔔 Clerk webhook received:", eventType, eventData);

    if (eventType === "user.created") {
      const {
        id,
        email_addresses,
        image_url,
        username,
        first_name,
        last_name,
      } = eventData;
      const prismaUser = await createUser({
        clerkId: id,
        name: `${first_name}${last_name ? ` ${last_name}` : ""}`,
        username: username || "", // Handle null/undefined username
        email: email_addresses[0]?.email_address || "",
        picture: image_url || "",
      });
      return NextResponse.json({ message: "OK", user: prismaUser });
    }

    if (eventType === "user.updated") {
      const {
        id,
        email_addresses,
        image_url,
        username,
        first_name,
        last_name,
      } = eventData;
      const prismaUser = await updateUser({
        clerkId: id,
        updateData: {
          name: `${first_name}${last_name ? ` ${last_name}` : ""}`,
          username: username || "",
          email: email_addresses[0]?.email_address || "",
          picture: image_url || "",
        },
        path: `/profile/${id}`,
      });
      return NextResponse.json({ message: "OK", user: prismaUser });
    }

    if (eventType === "user.deleted") {
      const { id } = eventData;
      const prismaUser = await deleteUser({ clerkId: id });
      return NextResponse.json({ message: "OK", user: prismaUser });
    }

    return NextResponse.json(
      { message: "Event type not supported" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Error processing webhook:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
