import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const redirectUrl = new URL('/', url.origin);
  redirectUrl.searchParams.set('utm_source', 'visitenkarte');
  redirectUrl.searchParams.set('utm_medium', 'print');
  redirectUrl.searchParams.set('utm_campaign', 'visitenkarte_wesel');

  return NextResponse.redirect(redirectUrl, { status: 307 });
}
