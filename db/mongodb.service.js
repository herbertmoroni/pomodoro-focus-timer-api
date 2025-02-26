class MongoDBService {
    constructor(model) {
        this.model = model;
    }

    async create(data) {
        try {
            const document = new this.model(data);
            // Call the custom validation method if it exists
            if (typeof document.validateTask === 'function') {
                document.validateTask();
            } else if (typeof document.validateSession === 'function') {
                document.validateSession();
            }
            return await document.save();
        } catch (error) {
            throw new Error(`Error creating document: ${error.message}`);
        }
    }

    async find(query = {}) {
        try {
            return await this.model.find(query);
        } catch (error) {
            throw new Error(`Error finding documents: ${error.message}`);
        }
    }

    async findById(id) {
        try {
            return await this.model.findById(id);
        } catch (error) {
            throw new Error(`Error finding document by ID: ${error.message}`);
        }
    }

    async update(id, data) {
        try {
            return await this.model.findByIdAndUpdate(id, data, { 
                new: true,
                runValidators: true 
            });
        } catch (error) {
            throw new Error(`Error updating document: ${error.message}`);
        }
    }

    async delete(id) {
        try {
            return await this.model.findByIdAndDelete(id);
        } catch (error) {
            throw new Error(`Error deleting document: ${error.message}`);
        }
    }
}

module.exports = MongoDBService;