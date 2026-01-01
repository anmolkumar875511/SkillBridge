class apiResponse {
    constructor(
        status,
        message = "Request successful",
        data = null
    ) {
        this.status = status;
        this.message = message;
        this.data = data;
        this.success = status >= 200 && status < 400;
    }
}

export default apiResponse;