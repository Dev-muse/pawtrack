import { NextResponse } from "next/server"
 function Middleware(request:Request){

  console.log('url', request.url)

  return NextResponse.next()

} 
export default Middleware

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}