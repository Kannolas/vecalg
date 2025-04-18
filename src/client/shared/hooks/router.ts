import { useRouter as NextRouter } from 'next/navigation';

export const routes = {
    signin: () => '/',

    tokens: () => '/dashboard/tokens',
    directions: () => '/dashboard/directions',
    users: () => '/dashboard/users',
};

export const useRouter = () => {
    const router = NextRouter();

    return {
        signin: () => router.push(routes.signin()),

        tokens: () => router.push(routes.tokens()),
        directions: () => router.push(routes.directions()),
        users: () => router.push(routes.users()),
    };
};
