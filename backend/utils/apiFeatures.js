class ApiFeature {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr || {}; // Default to an empty object if queryStr is undefined
    }

    // Search method
    search() {
        const keyword = this.queryStr.keyword
            ? {
                name: {
                    $regex: this.queryStr.keyword,
                    $options: 'i', // Case-insensitive
                },
            }
            : {};

        this.query = this.query.find({ ...keyword });
        return this; // Enable method chaining
    }

    // Filter method
    filter() {
        // Shallow copy of queryStr
        const queryCopy = { ...this.queryStr };

        // Fields to exclude from filtering
        const removeFields = ['keyword', 'page', 'limit'];
        removeFields.forEach((el) => delete queryCopy[el]);

        // Advanced filtering for price, ratings, etc.
        let queryStr = JSON.stringify(queryCopy);

        // Replace operators like gt, gte, etc., with MongoDB syntax
        queryStr = queryStr.replace(
            /\b(gt|gte|lt|lte)\b/g,
            (match) => `$${match}`
        );

        // Apply filters to the query
        this.query = this.query.find(JSON.parse(queryStr));
        return this; // Enable method chaining
    }

    // Pagination method
    pagination(resultPerPage) {
        const currentPage = Number(this.queryStr.page) || 1;
        const skip = resultPerPage * (currentPage - 1);

        this.query = this.query.limit(resultPerPage).skip(skip);
        return this; // Enable method chaining
    }
}

module.exports = ApiFeature;
