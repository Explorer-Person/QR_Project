exports.sendResponse = (res, data, process, status, statusCode) => {
    return res.status(statusCode).json({
        process,
        status,
        ...(!status ? { error: data } : { data }),
        statusCode,
    });
};

