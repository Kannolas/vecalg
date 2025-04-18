import _isEmpty from 'lodash/isEmpty';

import { CustomError } from '../../utils/get-error';

export class AuthModel<T> {
    _isError: boolean;

    _isDefault: boolean;

    error: CustomError | null;

    data: T | null;

    // @ts-expect-error
    static #emptyData = null;

    private constructor(data: T | null, isError?: boolean, _isDefault?: boolean, error?: CustomError | null) {
        this.data = data;
        this.error = error || null;
        this._isError = isError || false;
        this._isDefault = _isDefault || false;
    }

    static Error(error: CustomError): AuthModel<null> {
        return new AuthModel(this.#emptyData, true, false, error);
    }

    static Default(): AuthModel<null> {
        return new AuthModel(this.#emptyData, false, true);
    }

    static fromDTO<T>(data: T): AuthModel<T> {
        // @ts-expect-error
        return !data ? BaseModel.Default() : new BaseModel(data);
    }

    toDTO(): { data: T | null; _isError: boolean; _isDefault: boolean; error: CustomError | null } {
        return JSON.parse(JSON.stringify(this));
    }
}
