module.exports = catchAsync =
    (fn, sendResponse = true) =>
        async (req, res, next) => {

            // error and success response here
            const [error, result] = await Promise.resolve(fn(req, res, next))
                .then((res) => [null, res])
                .catch((err) => [err || true, null]);
            console.log(error);
            (sendResponse || error) &&
                res.status(error ? error.status || 500 : 200).json({
                    status: error ? error.status || 500 : 200,
                    data: error ? error.message : result,
                    // ...(req?.user && !error ? { basePath: process.env.AWS_S3_BASE_PATH } : {}),
                    message: error
                        ? error.message || "Something broke"
                        : "API request successfull",
                    ...(req.app.get("env") === "development" &&
                        error && {
                        devStack: error.stack,
                    }),
                });
        };
