import { config } from "@/src/lib/config";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {

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
            const AWSALB = cookies.find(cookie => cookie.startsWith('AWSALB='));
            const AWSALBCORS = cookies.find(cookie => cookie.startsWith('AWSALBCORS='));

            const response = NextResponse.json(data);

            if (AWSALB) {
                const tgValue = AWSALB.split('=')[1];
                response.cookies.set('AWSALB', tgValue, {
                    httpOnly: false,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'strict',
                    path: '/',
                });
            }

            if (AWSALBCORS) {
                const corsValue = AWSALBCORS.split('=')[1];
                response.cookies.set('AWSALBCORS', corsValue, {
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