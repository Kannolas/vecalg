interface CustomError {
    code?: number;
    message?: string;
}

export class BaseModel<T> {
    _isError: boolean;

    _isDefault: boolean;

    data: T | null;

    error: CustomError | null;

    // @ts-expect-error
    static #emptyData = null;

    private constructor(data: T | null, isError?: boolean, _isDefault?: boolean, error?: CustomError) {
        this.data = data;
        this._isError = isError || false;
        this._isDefault = _isDefault || false;
        this.error = error || null;
    }

    static Error(error: CustomError): BaseModel<null> {
        return new BaseModel(this.#emptyData, true, false, error);
    }

    static Default(): BaseModel<null> {
        return new BaseModel(this.#emptyData, false, true);
    }

    static fromDTO<T>(data: T): BaseModel<T> {
        // @ts-expect-error
        return !data ? BaseModel.Default() : new BaseModel(data);
    }

    toDTO(): { data: T | null; _isError: boolean; _isDefault: boolean; error: CustomError | null } {
        return JSON.parse(JSON.stringify(this));
    }
}
