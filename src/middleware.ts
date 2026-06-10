import {NextRequest, NextResponse} from "next/server";

const locales = ["en-US", "es"]
const defaultLocale = "en-US"

function getLocale(request: NextRequest): string {
    const acceptLanguage = request.headers.get("accept-language")
    if (acceptLanguage) {
        const preferred = acceptLanguage.split(",").map(l => l.split(";")[0].trim())
        for (const lang of preferred) {
            const matched = locales.find(l => l === lang || l.startsWith(lang.split("-")[0]))
            if (matched) return matched
        }
    }
    return defaultLocale
}

export function middleware(request: NextRequest) {
    const {pathname} = request.nextUrl

    // Check if the pathname already has a locale
    const pathnameHasLocale = locales.some(
        locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    )

    if (pathnameHasLocale) return

    // Skip API routes and static files
    if (pathname.startsWith("/api") || pathname.startsWith("/_next") || pathname.includes(".")) return

    const locale = getLocale(request)
    request.nextUrl.pathname = `/${locale}${pathname}`
    return NextResponse.redirect(request.nextUrl)
}

export const config = {
    matcher: ["/((?!_next|api|favicon.ico|.*\\..*).*)"],
}
