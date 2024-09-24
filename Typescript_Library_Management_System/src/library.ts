// library.ts

// Import readline-sync for user input in Node.js
import * as readlineSync from 'readline-sync';

// Define an interface for books
interface Book {
    isbn: string;
    title: string;
    author: string;
    price: number;
    quantity: number;
}

// Define an interface for transactions
interface Transaction {
    bookTitle: string;
    quantity: number;
    totalAmount: number;
}

// Class to manage the library
export class Library {
    private inventory: Book[] = [];
    private transactions: Transaction[] = [];
    private totalIncome: number = 0;

    constructor() {
        // Initialize inventory and transactions (same as before)
        this.inventory.push(
            { isbn: '978-1-4000-8306-8', title: 'Atomic Habits', author: 'James Clear', price: 20, quantity: 10 },
            { isbn: '978-0-399-59044-5', title: 'The Power of Habit', author: 'Charles Duhigg', price: 18, quantity: 10 },
            { isbn: '978-0-8041-3670-5', title: 'Mindset: The New Psychology of Success', author: 'Carol S. Dweck', price: 22, quantity: 10 }
        );

        // Predefined transactions (same as before)
        this.transactions.push(
            { bookTitle: 'Atomic Habits', quantity: 5, totalAmount: 100 },
            { bookTitle: 'The Power of Habit', quantity: 7, totalAmount: 126 },
            { bookTitle: 'Mindset: The New Psychology of Success', quantity: 5, totalAmount: 110 }
        );

        this.calculateTotalIncome();
    }

    // Method to calculate total income from transactions
    private calculateTotalIncome(): void {
        this.totalIncome = this.transactions.reduce((acc, transaction) => acc + transaction.totalAmount, 0);
    }

    // Method to get a book by index (public method to access private inventory)
    public getBookByIndex(index: number): Book | null {
        return this.inventory[index] || null;
    }

    // Method to get inventory for display
    public getInventory(): string {
        return this.inventory.map((book, index) => 
            `${index + 1}) ${book.title} by ${book.author} - Price: $${book.price} | Quantity: ${book.quantity}`
        ).join('<br>');
    }

    // Method to sell books and update the inventory
    public sellBook(book: Book, quantity: number): void {
        if (book.quantity >= quantity) {
            const totalAmount = book.price * quantity;
            book.quantity -= quantity;
            this.transactions.push({ bookTitle: book.title, quantity, totalAmount });
            this.totalIncome += totalAmount; // Update total income with new sale
        } else {
            console.log(`Not enough stock for "${book.title}". Only ${book.quantity} available.`);
        }
    }



    public getBalance(): string {
        return `
            <h2>Total Income: $${this.totalIncome}</h2>
            <h3>Transaction History:</h3>
            <div>${this.transactions.map(transaction => 
                `Sold ${transaction.quantity} copies of "${transaction.bookTitle}" for $${transaction.totalAmount}`
            ).join('<br>')}</div>
            <button id="backToMenuButton">Back to Menu</button> <!-- Added button -->
        `;
    }

    // Show the main menu
    getMenu(): string {
        return `
            <h2>Main Menu</h2>
            <button id="manageInventoryButton">Manage Inventory</button>
            <button id="sellBooksButton">Sell Books</button>
            <button id="viewBalanceButton">View Balance</button>
        `;
    }

    // Method to add a new book to the inventory
    addBook(book: Book): void {
        const existingBook = this.inventory.find(b => b.isbn === book.isbn);
        if (existingBook) {
            existingBook.quantity += book.quantity;
            console.log(`Updated stock of "${book.title}". New quantity: ${existingBook.quantity}`);
        } else {
            this.inventory.push(book);
            console.log(`Added new book: "${book.title}" to the inventory.`);
        }
    }

    // Method to choose a book from the inventory for sale
    chooseBookForSale(bookIndex: number): Book | null {
        if (bookIndex >= 0 && bookIndex < this.inventory.length) {
            return this.inventory[bookIndex];
        } else {
            console.log("Invalid selection. Try again.");
            return null;
        }
    }
}
