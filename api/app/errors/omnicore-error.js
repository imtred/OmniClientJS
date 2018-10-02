class OmniCoreError extends Error {
    constructor(errors) {
        const message = 'OmniCore error';
        super(message);
        this.status = 409;
        this.message = message;
        this.errors = {
            code: errors.code,
            desc: errors.message
        };
    }
}

module.exports = OmniCoreError;
