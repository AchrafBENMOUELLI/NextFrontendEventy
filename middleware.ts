import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  return NextResponse.next(); // désactive la redirection
}

export const config = {
  matcher: ['/events/new', '/profile'],
};
