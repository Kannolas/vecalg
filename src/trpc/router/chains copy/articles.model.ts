import _isEmpty from 'lodash/isEmpty';

import { CustomError } from '../../utils/get-error';

export class ChainsModel<T> {
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

    static Error(error: CustomError): ChainsModel<null> {
        return new ChainsModel(this.#emptyData, true, false, error);
    }

    static Default(): ChainsModel<null> {
        return new ChainsModel(this.#emptyData, false, true);
    }

    static fromDTO<T>(data: T): ChainsModel<T> {
        // @ts-expect-error
        return !data ? ChainsModel.Default() : new ChainsModel(data);
    }

    toDTO(): { data: T | null; _isError: boolean; _isDefault: boolean; error: CustomError | null } {
        return JSON.parse(JSON.stringify(this));
    }
}
