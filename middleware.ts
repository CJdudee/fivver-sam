import { NextRequest, NextResponse } from 'next/server'

const allowedList = process.env.NODE_ENV === 'production' ? ['https://www.sprachgeist.com', 'http://www.sprachgeist.com', 'https://sprachgeist.com', 'http://sprachgeist.com', '*'] : ['http://localhost:3000', 'https://www.google.com', ]
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {

    const origin = request.headers.get('origin')
    console.log(origin, '2origin')

    // !origin is for postman and api tester

    if(origin && !allowedList.includes(origin) || !origin ) {
        return new NextResponse(null, {
            status: 400,
            statusText: "Bad Request",
            headers: {
                'Content-Type': 'text/plain'
            }
        })
    }

  return NextResponse.next()
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: '/api/:path*',
}