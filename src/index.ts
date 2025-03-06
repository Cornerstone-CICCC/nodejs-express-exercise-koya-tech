import express, { Request, Response } from 'express';

const app = express();
const port = 3000;

app.use(express.json());

interface Product {
    id: string;
    product_name: string;
    product_description: string;
    product_price: number;
}

let products: Product[] = [];

app.get('/products', (req: Request, res: Response) => {
    res.json(products);
});

app.post('/products', (req: Request, res: Response) => {
    const product: Product = req.body;
    products.push(product);
    res.status(201).json(product);
});

app.get('/products/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    const product = products.find(p => p.id === id);
    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
});

app.put('/products/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    const index = products.findIndex(p => p.id === id);
    if (index === -1) {
        return res.status(404).json({ message: 'Product not found' });
    }

    products[index] = { ...products[index], ...req.body };
    res.json(products[index]);
});

app.delete('/products/:id', (req: Request, res: Response) => {
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
