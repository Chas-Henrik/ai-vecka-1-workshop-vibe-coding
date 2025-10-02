
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const highscores = await prisma.score.findMany({
      take: 10,
      orderBy: {
        value: "desc",
      },
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
    });
    return NextResponse.json({ highscores });
  } catch (error) {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
