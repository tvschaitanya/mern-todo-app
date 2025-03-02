export function createError(statusCode, message) {
    // Step 1: Create a new Error object with the provided message
    const error = new Error(message);
    
    // Step 2: Attach a statusCode property to the error
    // The statusCode represents the HTTP status code (like 404 for "Not Found", 500 for "Internal Server Error", etc.)
    error.statusCode = statusCode;
    
    // Step 3: Attach a name property to make it easier to identify custom errors
    // By default, the name of an error is just "Error", but we can set it to something like "CustomError" to identify it easily in logs
    error.name = "CustomError";
    
    // Step 4: Optionally, we can add a stack trace for debugging purposes
    // A stack trace shows where in the code the error was created, which helps developers debug more easily
    error.stack = (new Error()).stack;
    
    // Step 5: Return the custom error object
    return error;
}
