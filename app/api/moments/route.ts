import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const runtime = "nodejs";

export async function GET() {
  try {
    const moments = await prisma.moment.findMany({
      orderBy: { createdAt: "asc" },
    });

    return NextResponse.json({ success: true, data: moments }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: "Failed to fetch moments" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");
    const title = (formData.get("title") as string | null) ?? null;
    const subtitle = (formData.get("subtitle") as string | null) ?? null;

    if (!(file instanceof File)) {
      return NextResponse.json({ success: false, error: "Missing file" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const base64String = buffer.toString('base64');

    const finalImageString = `data:${file.type};base64,${base64String}`;

    const now = new Date();
    const label = now.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

    const created = await prisma.moment.create({
      data: {
        title: title && title.trim().length > 0 ? title.trim() : "A tiny moment",
        subtitle: subtitle && subtitle.trim().length > 0 ? subtitle.trim() : null,
        dateLabel: label,
        image: finalImageString,
        fixed: false,
      },
    });

    return NextResponse.json({ success: true, data: created }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: "Failed to save moment" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();
    const { id } = body ?? {};

    if (typeof id !== "number") {
      return NextResponse.json({ success: false, error: "Missing or invalid id" }, { status: 400 });
    }

    const existing = await prisma.moment.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ success: false, error: "Moment not found" }, { status: 404 });
    }

    if (existing.fixed) {
      return NextResponse.json({ success: false, error: "Cannot delete fixed core memories" }, { status: 400 });
    }

    await prisma.moment.delete({ where: { id } });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: "Failed to delete moment" }, { status: 500 });
  }
}
