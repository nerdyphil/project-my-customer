module.exports = (app) => {
    const transactions = require('../controllers/transaction.controller.js');

    // Create a new Transaction
    app.post('/transactions', transactions.create);

    // Retrieve all Transactions
    app.get('/transactions', transactions.findAll);

    // Retrieve a single Transaction with transaction_id
    app.get('/transactions/:transaction_id', transactions.findOne);

    // Update a Transaction with transaction_id
    app.put('/transactions/:transaction_id', transactions.update);

    // Delete a Transaction with transaction_id
    app.delete('/transactions/:transaction_id', transactions.delete);
}