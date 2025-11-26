import { NextRequest, NextResponse } from "next/server";
import prisma from '@/lib/prisma'

export async function POST(req: NextRequest) {
  try {
    const poem = await req.json();

    if(!poem) return NextResponse.json({success: false, error: 'No poem found'}, {status: 404});

    const savedPoem = await prisma.poem.create({
      data: {poem},
    });

    return NextResponse.json({success: true, data: savedPoem}, {status: 200});
  } catch(error) {
    console.error(error);
    return NextResponse.json({success: false, error: error}, {status: 500});
  }
}

export async function GET() {
  try {
    const poems = await prisma.poem.findMany();

    if(!poems || poems.length == 0) {
      return NextResponse.json({success: false, error: 'No poem found'}, {status: 404});
    }

    return NextResponse.json({success: true, data: poems}, {status: 200});
  } catch (error) {
    console.error(error);
    return NextResponse.json({success: false, error: error}, {status: 500});
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const data = await req.json();
    const {id} = data;

    if(!id) return NextResponse.json({success: false, error: 'No ID found'}, {status: 404});

    const poem = await prisma.poem.findUnique({
      where: {
        id,
      }
    });

    if(!poem) return NextResponse.json({success: false, error: 'No poem found'}, {status: 404});

    await prisma.poem.delete({
      where: {
        id: poem.id,
      }
    });

    return NextResponse.json({success: true, data: poem}, {status: 200});
  } catch (error) {
    console.error(error);
    return NextResponse.json({success: false, error: 'Server Error'}, {status: 500});
  }
}