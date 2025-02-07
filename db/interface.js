class DatabaseInterface {
    async find() { throw new Error('Not implemented'); }
    async create(data) { throw new Error('Not implemented'); }
}

module.exports = DatabaseInterface;