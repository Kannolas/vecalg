import type { TRPCError } from '@trpc/server';

export interface CustomError {
    code: TRPCError['code'];
    message: string;
}

const errors: Record<TRPCError['code'], CustomError> = {
    INTERNAL_SERVER_ERROR: { code: 'INTERNAL_SERVER_ERROR', message: 'Internal server error' },
    PARSE_ERROR: { code: 'PARSE_ERROR', message: 'Parse error' },
    BAD_REQUEST: { code: 'BAD_REQUEST', message: 'Bad request' },
    NOT_IMPLEMENTED: { code: 'NOT_IMPLEMENTED', message: 'Not implemented' },
    UNAUTHORIZED: { code: 'UNAUTHORIZED', message: 'Unauthorized' },
    FORBIDDEN: { code: 'FORBIDDEN', message: 'Forbidden' },
    NOT_FOUND: { code: 'NOT_FOUND', message: 'Not found' },
    METHOD_NOT_SUPPORTED: { code: 'METHOD_NOT_SUPPORTED', message: 'Method not supported' },
    TIMEOUT: { code: 'TIMEOUT', message: 'Request timeout' },
    CONFLICT: { code: 'CONFLICT', message: 'Conflict' },
    CLIENT_CLOSED_REQUEST: { code: 'CLIENT_CLOSED_REQUEST', message: 'Client closed request' },
    PRECONDITION_FAILED: { code: 'PRECONDITION_FAILED', message: 'Precondition failed' },
    PAYLOAD_TOO_LARGE: { code: 'PAYLOAD_TOO_LARGE', message: 'Payload too large' },
    UNPROCESSABLE_CONTENT: { code: 'UNPROCESSABLE_CONTENT', message: 'Unprocessable content' },
    TOO_MANY_REQUESTS: { code: 'TOO_MANY_REQUESTS', message: 'Too many requests' },
};

export const getError = <T extends CustomError>(
    err: T | unknown = {
        code: 500,
        message: 'Internal server error',
    },
): CustomError => {
    let error = err as CustomError;

    if (typeof err === 'object' && error.code) {
        if (errors[error.code]) {
            error = errors[error.code];
        }
    }

    return error;
};
