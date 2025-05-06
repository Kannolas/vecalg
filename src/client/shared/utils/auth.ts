import CredentialsProvider from 'next-auth/providers/credentials';
import type { NextAuthOptions } from 'next-auth';

interface AuthResponse {
    access_token: string;
}

const providers: NextAuthOptions['providers'] = [];

if (process.env.CREDENTIALS_AUTH) {
    providers.push(
        CredentialsProvider({
            name: 'SignIn',
            credentials: {
                email: {
                    label: 'email',
                    type: 'text',
                    placeholder: 'email@example.com',
                },
                password: { label: 'password', type: 'password' },
            },
            async authorize(creds) {
                if (!creds) return null;

                const url = `${process.env.EXTERNAL_API_SERVICE}/users/login`;
                const response: AuthResponse | null = await fetch(url, {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: creds.email,
                        password: creds.password,
                    }),
                })
                    .then((res) => {
                        if (res.ok) {
                            return res.json();
                        }
                    })
                    .catch((error) => console.log('errorData ', error));

                if (!response?.access_token) return null;

                return {
                    id: Math.random().toString(),
                    email: creds?.email,
                    access_token: response.access_token,
                };
            },
        }),
    );
}

// https://next-auth.js.org/configuration/options
export const authOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: 'jwt', // required for CredentialsProvider
    },
    providers,
    pages: {
        signIn: '/',
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.access_token = user.access_token;
            }
            return { ...token };
        },

        async session({ session }) {
            return session;
        },
    },
};

declare module 'next-auth' {
    interface Session {
        access_token: string;
    }

    interface User {
        email: string;
        access_token: string;
    }
}
