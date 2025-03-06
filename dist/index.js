"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
let products = [];
// GET /products : GET request for all products
app.get('/products', (req, res) => {
    res.json(products);
});
// POST /products : POST request to add one product
app.post('/products', (req, res) => {
    const product = req.body;
    // For a real application, add validation and error handling here
    products.push(product);
    res.status(201).json(product);
});
// GET /products/:id : GET request for a product by id
app.get('/products/:id', (req, res) => {
    const { id } = req.params;
    const product = products.find(p => p.id === id);
    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
});
// PUT /products/:id : PUT request to update a product by id
app.put('/products/:id', (req, res) => {
    const { id } = req.params;
    const index = products.findIndex(p => p.id === id);
    if (index === -1) {
        return res.status(404).json({ message: 'Product not found' });
    }
    // Merge existing product with the new fields
    products[index] = Object.assign(Object.assign({}, products[index]), req.body);
    res.json(products[index]);
});
// DELETE /products/:id : DELETE request to delete a product by id
app.delete('/products/:id', (req, res) => {
    const { id } = req.params;
    const index = products.findIndex(p => p.id === id);
    if (index === -1) {
        return res.status(404).json({ message: 'Product not found' });
    }
    const deletedProduct = products.splice(index, 1);
    res.json(deletedProduct[0]);
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
