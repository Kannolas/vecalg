import _isEmpty from 'lodash/isEmpty';

import { CustomError } from '../../utils/get-error';

export class TokensModel<T> {
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

    static Error(error: CustomError): TokensModel<null> {
        return new TokensModel(this.#emptyData, true, false, error);
    }

    static Default(): TokensModel<null> {
        return new TokensModel(this.#emptyData, false, true);
    }

    static fromDTO<T>(data: T): TokensModel<T> {
        // @ts-expect-error
        return !data ? TokensModel.Default() : new TokensModel(data);
    }

    toDTO(): { data: T | null; _isError: boolean; _isDefault: boolean; error: CustomError | null } {
        return JSON.parse(JSON.stringify(this));
    }
}
