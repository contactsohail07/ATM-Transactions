const mongoose = require('mongoose');

var mongodb = require('../config/mongodb');

//models
var Account = mongodb.models.Account;



async function Check_balance(req, res) {

    let card_num = req.body.card_num;

    await Account.findOne({ "CardNumber": card_num }, function (err, data) {

        if (err) {
            console.log("balance check error", err)
        } else {
            console.log("balance check data", data)
          
            if (data) {
                console.log("found data", data)
                let balance = data.Balance;
                let balObj = {
                    "balance": balance
                }
          
                return res.status(200).json(balObj);
          
            } else {
                console.log("no data found")
          
                return res.status(200).json({ "message": "card number not exist" })
            }
        }
    });
}


async function Deposit(req, res) {

    let card_num = req.body.card_num;
    let amount = req.body.amount;

    await Account.findOne({ "CardNumber": card_num }, async function (err, data) {
      
        if (err) {
            console.log("card deposit check error", err)
        } else {
            console.log("card deposit check data", data)
      
            if (data) {
                let balance = data.Balance;
                let new_balance = balance + amount;
                let balObj = {
                    "Balance": new_balance
                }

                await Account.update(balObj, function (err, data) {
      
                    return res.status(200).json({ "message": "deposit successfull" });
                })

            } else {
                console.log("no data found")
      
                return res.status(200).json({ "message": "card number not exist" })
            }
        }
    });
}

async function Withdraw(req, res) {

    let card_num = req.body.card_num;
    let amount = req.body.amount;

    await Account.findOne({ "CardNumber": card_num }, async function (err, data) {
      
        if (err) {
            console.log("withdraw check error", err)
        } else {
            console.log("withdraw check data", data)
      
            if (data) {
                let balance = data.Balance;
      
                if (amount > balance) {
      
                    return res.status(200).json({ "message": "Insufficient balance; Enter lesser amount" });
                } else {
                    let new_balance = balance - amount;
                    let balObj = {
                        "Balance": new_balance
                    }

                    await Account.update(balObj, function (err, data) {
      
                        return res.status(200).json({ "message": "successfully withdrawn" });
                    })
                }
            } else {
                console.log("no data found")
      
                return res.status(200).json({ "message": "card number not exist" })
            }
        }
    });
}

async function Change_pin(req, res) {

    let card_num = req.body.card_num;
    let card_pin = req.body.card_pin;
    let new_pin = req.body.new_pin;

    await Account.findOne({ "CardNumber": card_num }, async function (err, data) {
      
        if (err) {
            console.log("change pin check error", err)
        } else {
            console.log("change pin check data", data)
      
            if (data) {
                let oldPin = data.Password;
      
                if (oldPin === card_pin) {
      
                    if (oldPin === new_pin) {
      
                        return res.status(200).json({ "message": "Your new password cannot be same as that of the old password" });
                    } else {
                        let pwdObj = {
                            "Password": new_pin
                        }

                        await Account.update(pwdObj, function (err, data) {
      
                            return res.status(200).json({ "message": "password changed successfully" });
                        })
                    }
                } else {
      
                    return res.status(200).json({ "message": "Incorrect pin" });
                }
            } else {
                console.log("no data found")
      
                return res.status(200).json({ "message": "card number not exist" })
            }
        }
    });
}


module.exports = {
    Check_balance: Check_balance,
    Deposit: Deposit,
    Withdraw: Withdraw,
    Change_pin: Change_pin
}