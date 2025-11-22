'use server';

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function savePalette(formData: FormData) {
  const name = formData.get('name') as string;
  const note = formData.get('note') as string;
  const colorsRaw = formData.get('colors');

  if(!name || !colorsRaw) {
    return {success: false, error: 'Missing required fields'};
  }

  const colors = JSON.parse(colorsRaw as string);

  try {
    await prisma.palette.create({
      data: {
        name,
        note,
        colors
      }
    });

    revalidatePath('/chroma');

    return {success: true};
  } catch (e: unknown) {
    console.error(`Error saving palette: ${e}`);
    return {success: false, error: 'Failed to save'};
  }
}