import './globals.css';
import '@plex-inc/bricks/style.css';

import { App } from '@/app/providers/app-provider';

import { trpc } from '../src/trpc/trpc-client';

export default trpc.withTRPC(App);
