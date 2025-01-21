class ApiFeatures {
    constructor(query, queryStr){
        this.query = query;
        this.queryStr = queryStr;
    }
    search(){
        const keyword = this.queryStr.keyword ? {
            name: {
                $regex: this.queryStr.keyword,
                $options: 'i'
            }
        } : {};

        this.query = this.query.find({...keyword});
        return this;
    }

    filter(){
       const queryCopy = {...this.queryStr};
  
         
         // Removing fields from the query
            const removeFields = ['keyword', 'limit', 'page']
            removeFields.forEach(el => delete queryCopy[el]);

            // Advance filter for price, ratings etc
            let queryStr = JSON.stringify(queryCopy);
            queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
            this.query = this.query.find(JSON.parse(queryStr));


            this.query = this.query.find(queryCopy);
            return this;
       
            
    }
}

module.exports = ApiFeatures;