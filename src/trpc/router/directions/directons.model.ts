import _isEmpty from 'lodash/isEmpty';

import { CustomError } from '../../utils/get-error';

export class DirectionsModel<T> {
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

    static Error(error: CustomError): DirectionsModel<null> {
        return new DirectionsModel(this.#emptyData, true, false, error);
    }

    static Default(): DirectionsModel<null> {
        return new DirectionsModel(this.#emptyData, false, true);
    }

    static fromDTO<T>(data: T): DirectionsModel<T> {
        // @ts-expect-error
        return !data ? DirectionsModel.Default() : new DirectionsModel(data);
    }

    toDTO(): { data: T | null; _isError: boolean; _isDefault: boolean; error: CustomError | null } {
        return JSON.parse(JSON.stringify(this));
    }
}
