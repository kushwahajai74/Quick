const ErrorMiddleWare = (err, req, res, next) => {
    console.error("Error:", err); // Log the error for debugging purposes

    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || "An unexpected error occurred. Please try again.",
    });

};

export default ErrorMiddleWare;