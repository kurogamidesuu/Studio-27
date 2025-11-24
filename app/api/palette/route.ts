import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, note, colors } = body;

    if(!name || !colors) {
      return NextResponse.json({error: 'Missing Data'}, {status: 400});
    }

    const savedPalette = await prisma?.palette.create({
      data: {
        name,
        note,
        colors
      }
    });
    
    return NextResponse.json({success: true, data: savedPalette }, { status: 201});
  } catch(error: unknown) {
    console.error(error);
    return NextResponse.json({success: false, error: 'Failed to add palette'}, {status: 500 });
  }
}

export async function GET() {
  try {
    const palettes = await prisma?.palette.findMany();

    return NextResponse.json({success: true, data: palettes || []}, {status: 200});
    
  } catch (error : unknown) {
    console.error(error);
    return NextResponse.json({success: false, error: 'Failed to get saved palettes'}, {status: 500})
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();
    const {id} = body;

    const deletedPalette = await prisma?.palette.delete({
      where: {
        id
      }
    });

    return NextResponse.json({success: true, data: deletedPalette}, {status: 200});
  } catch (error: unknown) {
    console.error(error);
    return NextResponse.json({success: false, error: 'Failed to delete palette'}, {status: 500});
  }
}