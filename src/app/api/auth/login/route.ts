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
        const setCookieHeader = apiResponse.headers.get('set-cookie');
        if (setCookieHeader) {
            const cookies = setCookieHeader.split(', ').map(cookie => cookie.split(';')[0]);
            const awsALBTG = cookies.find(cookie => cookie.startsWith('AWSALBTG='));
            const awsALBTGCORS = cookies.find(cookie => cookie.startsWith('AWSALBTGCORS='));

            const response = NextResponse.json(data);

            if (awsALBTG) {
                const tgValue = awsALBTG.split('=')[1];
                response.cookies.set('AWSALBTG', tgValue, {
                    httpOnly: false,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'strict',
                    path: '/',
                });
            }

            if (awsALBTGCORS) {
                const corsValue = awsALBTGCORS.split('=')[1];
                response.cookies.set('AWSALBTGCORS', corsValue, {
                    httpOnly: false,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'strict',
                    path: '/',
                });
            }

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