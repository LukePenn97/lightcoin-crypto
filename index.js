class Account {

  constructor(username) {
    this.username = username;
    this.transactions = [];
  }
  get balance() {
    let total = 0;
    for (const transaction of this.transactions) {
      total += transaction.value;
    }
    return total;
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }
}

class Transaction {

  constructor(amount, account) {
    this.account = account;
    this.amount = amount;
  }
  commit() {
    if (this.account.balance + this.value >= 0) {
      this.account.addTransaction(this);
    } else {
      console.log("Insufficient funds for transaction: ", this);
    }
  }
}

class Withdrawal extends Transaction {
  get value() {
    return -this.amount;
  }

}

class Deposit extends Transaction {
  get value() {
    return this.amount;
  }
}

// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected

const account1 = new Account("Luke");

console.log('Starting Balance:', account1.balance);

const t3 = new Deposit(500.00, account1);
t3.commit();

let t1 = new Withdrawal(600.00, account1);
t1.commit();

console.log('ending balance:', account1.balance);
