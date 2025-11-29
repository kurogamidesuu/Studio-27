'use server';

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function login(formData: FormData) {
  const password = formData.get("password");

  if(password === process.env.APP_PASSWORD) {
    (await cookies()).set('studio27_access', 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 365,
      path: '/',
    })

    redirect('/');
  } else {
    return {error: 'Wrong password'}
  }
}