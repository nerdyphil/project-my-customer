const Transaction = require('../models/transaction.js');

// Create and Save a new Transaction
exports.create = (req, res) => {
    // Validate request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Transaction content can not be empty"
        });
    }

    // Create a Transaction
    const transaction = new Transaction({
        
    });

    // Save Transaction in the database
    transaction.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Transaction."
        });
    });
};

// Retrieve and return all transactions from the database.
exports.findAll = (req, res) => {
    Transaction.find()
    .then(transactions => {
        res.send(transactions);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving transactions."
        });
    });
};

// Find a single transaction with a transaction_id
exports.findOne = (req, res) => {
    Transaction.findById(req.params.transaction_id)
    .then(transaction => {
        if(!transaction) {
            return res.status(404).send({
                message: "Transaction not found with id " + req.params.transaction_id
            });            
        }
        res.send(transaction);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Transaction not found with id " + req.params.transaction_id
            });                
        }
        return res.status(500).send({
            message: "Error retrieving transaction with id " + req.params.transaction_id
        });
    });
};

// Update a transaction identified by the transaction_id in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Transaction content can not be empty"
        });
    }

    // Find transaction and update it with the request body
    Transaction.findByIdAndUpdate(req.params.transaction_id, {
        date: Date.now(),
        from: req.body.from,
        to: req.body.to,
        description: req.body.description,
        payment_method: req.body.pay_method || "Cash"
    }, {new: true})
    .then(transaction => {
        if(!transaction) {
            return res.status(404).send({
                message: "Transaction not found with id " + req.params.transaction_id
            });
        }
        res.send(transaction);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Transaction not found with id " + req.params.transaction_id
            });                
        }
        return res.status(500).send({
            message: "Error updating transaction with id " + req.params.transaction_id
        });
    });
};

// Delete a transaction with the specified transaction_id in the request
exports.delete = (req, res) => {
    Transaction.findByIdAndRemove(req.params.transaction_id)
    .then(transaction => {
        if(!transaction) {
            return res.status(404).send({
                message: "Transaction not found with id " + req.params.transaction_id
            });
        }
        res.send({message: "Transaction deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Transaction not found with id " + req.params.transaction_id
            });                
        }
        return res.status(500).send({
            message: "Could not delete transaction with id " + req.params.transaction_id
        });
    });
};
