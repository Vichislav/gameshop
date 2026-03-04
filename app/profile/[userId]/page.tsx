import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import ProfilePageClient from "./ProfilePageClient";

interface ProfilePageProps {
  params: {
    userId: string;
  };
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const id = Number(params.userId);

  if (!Number.isInteger(id)) {
    notFound();
  }

  const user = await prisma.user.findUnique({
    where: { id },
  });

  if (!user) {
    notFound();
  }

  return (
    <ProfilePageClient
      user={{
        id: user.id,
        login: (user as any).login ?? "",
        email: user.email,
        createdAt: user.createdAt.toISOString(),
        info: (user as any).info ?? "",
        image: (user as any).image ?? null,
      }}
    />
  );
}

