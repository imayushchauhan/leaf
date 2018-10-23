module.exports = {
    getResponseObject: function (responseData, message, code) {
        return {
            data: responseData,
            message: message,
            code: code
        };
    }
};