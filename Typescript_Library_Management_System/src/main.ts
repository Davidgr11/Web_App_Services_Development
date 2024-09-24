import { Library } from './library';

const library = new Library();
const app = document.getElementById('app') as HTMLDivElement;


// Update in your JavaScript code (app.ts or similar)
function renderMenu() {
    app.innerHTML = `
        <div class="container">
            <h2>Library Management System</h2>
            <div class="button-container">
                <button id="manageInventoryButton" class="menu-button">Manage Inventory</button>
                <button id="sellBooksButton" class="menu-button">Sell Books</button>
                <button id="viewBalanceButton" class="menu-button">View Balance</button>
            </div>
        </div>
    `;
    // Event listeners
    document.getElementById('manageInventoryButton')?.addEventListener('click', showManageInventory);
    document.getElementById('sellBooksButton')?.addEventListener('click', showSellBooks);
    document.getElementById('viewBalanceButton')?.addEventListener('click', showBalance);
}

function showManageInventory() {
    app.innerHTML = `
        <h2>Manage Inventory</h2>
        ${library.getInventory()}
        <h2>Add New Book</h2>
        <input type="text" id="isbn" placeholder="Enter ISBN" />
        <input type="text" id="title" placeholder="Enter Title" />
        <input type="text" id="author" placeholder="Enter Author" />
        <input type="number" id="price" placeholder="Enter Price" />
        <input type="number" id="quantity" placeholder="Enter Quantity-Units" />
        <button id="addBookButton">Add Book</button>
        <button id="backToMenuButton">Back to Menu</button>
    `;

    // Event listener for adding a book
    document.getElementById('addBookButton')?.addEventListener('click', addBook);
    // Event listener for going back to the main menu
    document.getElementById('backToMenuButton')?.addEventListener('click', renderMenu);
}

function addBook() {
    const isbn = (document.getElementById('isbn') as HTMLInputElement).value;
    const title = (document.getElementById('title') as HTMLInputElement).value;
    const author = (document.getElementById('author') as HTMLInputElement).value;
    const price = (document.getElementById('price') as HTMLInputElement).valueAsNumber;
    const quantity = (document.getElementById('quantity') as HTMLInputElement).valueAsNumber;

    const alertDiv = document.createElement('div');

    // Validate the input values
    if (isbn && title && author && !isNaN(price) && !isNaN(quantity)) {
        library.addBook({ isbn, title, author, price, quantity });
        alertDiv.className = 'alert';
        alertDiv.innerText = 'Book added successfully!';
        showManageInventory(); // Refresh the inventory view
    } else {
        alertDiv.className = 'alert';
        alertDiv.innerText = 'Please fill in all fields correctly.';
    }

    // Append the alert to the app container
    app.prepend(alertDiv);
    setTimeout(() => alertDiv.remove(), 3000); // Remove alert after 3 seconds
}


function showSellBooks() {
    app.innerHTML = library.getInventory() + `
        <h2>Sell Books</h2>
        <input type="number" id="bookIndex" placeholder="Enter book index to sell" />
        <input type="number" id="quantity" placeholder="Enter quantity" />
        <button id="sellBookButton">Sell</button>
        <button id="backToMenuButton">Back to Menu</button>
    `;
    
    document.getElementById('backToMenuButton')?.addEventListener('click', renderMenu);

    document.getElementById('sellBookButton')?.addEventListener('click', () => {
        const bookIndex = (document.getElementById('bookIndex') as HTMLInputElement).valueAsNumber - 1;
        const quantity = (document.getElementById('quantity') as HTMLInputElement).valueAsNumber;

        // Check if the book index is valid
        const book = library.getBookByIndex(bookIndex);
        if (book) {
            // Attempt to sell the book
            library.sellBook(book, quantity);

            // Show confirmation message based on the result of the sale
            if (book.quantity < quantity) {
                alert(`Not enough stock for "${book.title}". Only ${book.quantity} available.`);
            } else {
                alert(`Sold ${quantity} copies of "${book.title}".`);
            }

            // Optionally, refresh the sell books page to see updated inventory
            showSellBooks(); // Refresh the sell books page to see updated inventory
        } else {
            alert('Invalid book selection. Please enter a valid index.');
        }
    });
}

function showBalance() {
    app.innerHTML = library.getBalance(); // Get balance HTML from library

    // Add event listener for the back button to return to the main menu
    document.getElementById('backToMenuButton')?.addEventListener('click', renderMenu);
}

// Initial render
renderMenu();
