import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const redirectUrl = new URL('/', url.origin);
  redirectUrl.searchParams.set('utm_source', 'flyer');
  redirectUrl.searchParams.set('utm_medium', 'print');
  redirectUrl.searchParams.set('utm_campaign', 'a6_wesel');

  return NextResponse.redirect(redirectUrl, { status: 307 });
}
