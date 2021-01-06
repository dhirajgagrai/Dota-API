class ApiError {
    constructor(code, message) {
        this.code = code;
        this.message = message;
    }

    static badRequest(msg) {
        return new ApiError(400, msg);
    }

    static notFound(msg) {
        return new ApiError(404, msg);
    }

    static methodNotAllowed(msg) {
        return new ApiError(405, msg);
    }
}

module.exports = ApiError;