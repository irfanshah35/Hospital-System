import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('authToken')?.value
  
  const isAuthenticated = !!token
  const pathname = request.nextUrl.pathname

  const publicRoutes = ['/', '/signup']
  const isPublicRoute = publicRoutes.includes(pathname)

  const adminRoutes = ['/admin/dashboard']
  const doctorRoutes = ['/doctor/dashboard'] 
  const patientRoutes = ['/patient/dashboard']

  if (!isAuthenticated && !isPublicRoute) {
    const loginUrl = new URL('/', request.url)
    return NextResponse.redirect(loginUrl)
  }

  if (isAuthenticated && isPublicRoute) {
    const userRole = request.cookies.get('userRole')?.value || 'patient'
    
    let dashboardUrl = '/patient/dashboard'
    if (userRole === 'admin') dashboardUrl = '/admin/dashboard'
    if (userRole === 'doctor') dashboardUrl = '/doctor/dashboard'
    
    return NextResponse.redirect(new URL(dashboardUrl, request.url))
  }

  if (isAuthenticated) {
    const userRole = request.cookies.get('userRole')?.value || 'patient'
    
    if (adminRoutes.includes(pathname) && userRole !== 'admin') {
      // Redirect to their role-appropriate dashboard
      let dashboardUrl = '/patient/dashboard'
      if (userRole === 'doctor') dashboardUrl = '/doctor/dashboard'
      
      return NextResponse.redirect(new URL(dashboardUrl, request.url))
    }
    
    if (doctorRoutes.includes(pathname) && userRole !== 'doctor') {
      let dashboardUrl = '/patient/dashboard'
      if (userRole === 'admin') dashboardUrl = '/admin/dashboard'
      
      return NextResponse.redirect(new URL(dashboardUrl, request.url))
    }
    
    if (patientRoutes.includes(pathname) && userRole !== 'patient') {
      let dashboardUrl = '/admin/dashboard'
      if (userRole === 'doctor') dashboardUrl = '/doctor/dashboard'
      
      return NextResponse.redirect(new URL(dashboardUrl, request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
  
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}