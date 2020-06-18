module.exports = (app) => {
    const transactions = require('../controllers/transaction.controller.js');

    // Create a new Transaction
    app.post('/transactions/new', transactions.create);

    // Retrieve all Transactions
    app.get('/transactions/all', transactions.findAll);

    // Retrieve a single Transaction with transaction_id
    app.get('/transactions/view/:transaction_id', transactions.findOne);

    // Update a Transaction with transaction_id
    app.put('/transactions/update/:transaction_id', transactions.update);

    // Delete a Transaction with transaction_id
    app.delete('/transactions/remove/:transaction_id', transactions.delete);
}
