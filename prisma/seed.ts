import { PrismaClient } from "@/lib/generated/prisma";

const prisma = new PrismaClient();

async function main() {
  await prisma.user.create({
    data: {
      clerkId: "clerk_123456",
      name: "John Doe",
      username: "johndoe",
      email: "john@example.com",
      password: "hashed_password_123",
      bio: "I love asking and answering tech questions!",
      picture: "https://i.pravatar.cc/150?img=3",
      location: "Bangalore, India",
      portfolioWebsite: "https://johndoe.dev",
      reputation: 100,
    },
  });

  console.log("✅ User inserted");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
