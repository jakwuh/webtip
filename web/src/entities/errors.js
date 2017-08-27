// Error can not be extended in ES6+. See https://github.com/babel/babel/issues/4269
export function CommonError(message) {
    Error.call(this, message);
    this.name = this.constructor.name;
    this.message = message;

    if (Error.captureStackTrace) {
        Error.captureStackTrace(this, this.constructor);
    } else {
        this.stack = (new Error()).stack;
    }
}

CommonError.prototype = Object.create(Error.prototype);

export class NotFoundError extends CommonError {

    constructor(message) {
       super(message);
    }

}
