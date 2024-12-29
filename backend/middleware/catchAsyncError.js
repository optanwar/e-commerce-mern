module.exports = (CacheAsyncError) => (req,res,next) => {
    Promise.resolve(CacheAsyncError(req,res,next)).catch(next).catch(next);
}