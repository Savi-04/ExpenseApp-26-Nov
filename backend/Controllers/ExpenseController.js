const UserModel = require("../Models/User");

const addTransaction = async (req, res) => {
    const { id } = req.user;  //user is what we set from decoding jwt in jwtAuthenticator 
    console.log(id)  //to be removed
    try {
        const userData = await UserModel.findByIdAndUpdate(
            id,
            { $push: { expenses: req.body } },
            { new: true } // For Returning the updated documents
        )
        res.status(200)
        .json({
            message: "Expense added successfully",
            success: true,
            data: userData?.expenses
        })
        

        
        
        
        
        
    } catch (err) {
        return res.status(500).json({
            message: "Something went wrong",
            error: err,
            success: false
        })
    }
}

const getAllTransactions = async (req, res) => {
    
    console.log("get transaction request from Frontend")  //to be removed
    const { id } = req.user;
    console.log(`This is req.user --> ${req.user}`)  //to be removed
    try {
        const userData = await UserModel.findById(id).select('expenses');
        
        console.log(`This is User DATA --> ${userData}`)  //to be removed
        res.status(200)
        .json({
            message: "Fetched Expenses successfully",
            success: true,
            data: userData?.expenses
        })
    } catch (err) {
        return res.status(500).json({
            message: "Something went wrong",
            error: err,
            success: false
        })
    }
}

const deleteTransaction = async (req, res) => {
    const { id } = req.user;       //this is the user id 
    const expenseId = req.params.expenseId;      //id of the expense
    try {
        const userData = await UserModel.findByIdAndUpdate(
            id,
            { $pull: { expenses: { _id: expenseId } } },
            { new: true } // For Returning the updated documents
        )
        res.status(200)
        .json({
            message: "Expense Deleted successfully",
            success: true,
            data: userData?.expenses
        })
    } catch (err) {
        return res.status(500).json({
            message: "Something went wrong",
            error: err,
            success: false
        })
    }
}



const updateTransaction = async (req, res) => {
    const { id } = req.user; // this is the user id
    const expenseId = req.params.expenseId; // id of the expense to be updated
    
    try {
        console.log("PUT route is running-2"); // for debugging  //to be removed
        
        // Update the specific expense within the user's expenses array
        const userData = await UserModel.findOneAndUpdate(
            { _id: id, "expenses._id": expenseId }, // find user with matching expense
            { $set: { "expenses.$[elem]": req.body } }, // update the matching expense
            {
                new: true, // return updated document
                arrayFilters: [{ "elem._id": expenseId }] // specify which array item to update
            }
        );
        
        res.status(200)
        .json({
            message: "Expense Updated successfully",
            success: true,
            data: userData?.expenses
        })
    } catch (err) {
        return res.status(500).json({
            message: "Something went wrong",
            error: err,
            success: false
        })
    }
}

module.exports = {
    addTransaction,
    getAllTransactions,
    deleteTransaction,
    updateTransaction
}