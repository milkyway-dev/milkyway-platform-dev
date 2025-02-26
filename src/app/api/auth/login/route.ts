// filepath: /Users/rahultrippy/Documents/milkyway-platform/src/app/api/auth/login/route.ts
import { config } from "@/src/lib/config";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        console.log(request, 'request');
        const body = await request.json();
        const apiResponse = await fetch(`${config.server}/api/users/login`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
            credentials: 'include',
        });

        const data = await apiResponse.json();
        if (!apiResponse.ok) {
            return NextResponse.json(
                { message: data.message || 'Login failed' },
                { status: apiResponse.status }
            );
        }

        const awsALBCookie = apiResponse.headers.get('set-cookie')?.split(';').find(cookie => cookie.trim().startsWith('AWSALB='));
        if (awsALBCookie) {
            const cookieValue = awsALBCookie.split('=')[1];
            const response = NextResponse.json(data);
            response.cookies.set('AWSALB', cookieValue, {
                httpOnly: false,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                path: '/',
            });
            return response;
        }

        return NextResponse.json(data);

    } catch (error) {
        console.error('Error during login:', error);
        return NextResponse.json(
            { message: 'An error occurred during login' },
            { status: 500 }
        );
    }
}