class OmniCoreError extends Error {
    constructor(errors) {
        const message = 'OmniCore error';
        super(message);
        this.status = 409;
        this.message = message;
        this.errors = errors;
    }
}

module.exports = OmniCoreError;
