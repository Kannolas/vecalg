import { TrpcContext } from './trpc-context';

export interface TrpcRequest<T> {
    ctx: TrpcContext;
    input?: T;
}
