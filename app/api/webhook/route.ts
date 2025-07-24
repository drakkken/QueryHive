import { Webhook } from "svix";
import { NextRequest, NextResponse } from "next/server";
import { createUser, deleteUser, updateUser } from "@/lib/Actions/UserAction";

const WEBHOOK_SECRET = process.env.NEXT_CLERK_WEBHOOK_SECRET || "";

export async function POST(req: NextRequest) {
  console.log("✅ Webhook hit");

  try {
    const payload = await req.text();
    const headersList = req.headers;

    // Extract required webhook headers
    const heads = {
      "svix-id": headersList.get("svix-id") ?? "",
      "svix-timestamp": headersList.get("svix-timestamp") ?? "",
      "svix-signature": headersList.get("svix-signature") ?? "",
    };

    // Validate secret exists
    if (!WEBHOOK_SECRET) {
      console.error("❌ Missing WEBHOOK_SECRET");
      return NextResponse.json(
        { error: "Missing webhook secret" },
        { status: 500 }
      );
    }

    // Initialize webhook verifier
    const svix = new Webhook(WEBHOOK_SECRET);
    let evt: any;

    // Verify webhook signature
    try {
      evt = svix.verify(payload, heads);
    } catch (err) {
      console.error("Webhook verification failed", err);
      return NextResponse.json(
        { error: "Invalid webhook signature" },
        { status: 401 }
      );
    }

    const eventType = evt.type;
    const eventData = evt.data;

    console.log("🔔 Clerk webhook received:", eventType, eventData);

    switch (eventType) {
      case "user.created":
        try {
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
            username: username || "",
            email: email_addresses[0]?.email_address || "",
            picture: image_url || "",
          });

          return NextResponse.json({ message: "OK", user: prismaUser });
        } catch (error) {
          console.error("Error creating user:", error);
          return NextResponse.json(
            { error: "Failed to create user" },
            { status: 500 }
          );
        }

      case "user.updated":
        try {
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
        } catch (error) {
          console.error("Error updating user:", error);
          return NextResponse.json(
            { error: "Failed to update user" },
            { status: 500 }
          );
        }

      case "user.deleted":
        try {
          const { id } = eventData;
          await deleteUser({ clerkId: id });
          return NextResponse.json({ message: "OK" });
        } catch (error) {
          console.error("Error deleting user:", error);
          return NextResponse.json(
            { error: "Failed to delete user" },
            { status: 500 }
          );
        }

      default:
        return NextResponse.json(
          { error: "Unsupported event type" },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error("Unexpected error processing webhook:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
