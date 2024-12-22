import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

// Define default values
const DEFAULT_NAME = 'Kegan'
const DEFAULT_EMAIL = 'keganhollern@gmail.com'

export function middleware(request: NextRequest) {
  const headers = new Headers(request.headers)
  
  // Try to get from headers first, then fall back to defaults
  const remoteName = headers.get('Remote-Name') || DEFAULT_NAME
  const remoteEmail = headers.get('Remote-Email') || DEFAULT_EMAIL

  // Create a new response
  const response = NextResponse.next({
    request: {
      headers: new Headers({
        'x-user-name': remoteName,
        'x-user-email': remoteEmail,
      }),
    },
  })

  return response
}

export const config = {
  matcher: '/:path*',
}