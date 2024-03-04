const ProductController = require('../controllers/productsController');
const Product = require('../models/product');

// Mocks y configuración de pruebas
jest.mock('../models/product');
jest.mock('../utils/cloud_storage');

describe('Product Controller', () => {
    // Configuración común para todas las pruebas
    const req = {
        params: {},
        body: {},
        files: [],
    };

    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
    };

    const next = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    // Prueba para findByCategory
    describe('findByCategory', () => {
        test('debería obtener productos por categoría correctamente', async () => {
            const expectedData = [{ id: 1, name: 'Product1' }];
            Product.findByCategory.mockResolvedValue(expectedData);

            req.params.id_category = 1;

            await ProductController.findByCategory(req, res, next);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(expectedData);
            expect(next).not.toHaveBeenCalled();
        });

        test('debería manejar errores al obtener productos por categoría', async () => {
            const errorMessage = 'Error al listar los productos por categoria';
            Product.findByCategory.mockRejectedValue(new Error(errorMessage));

            req.params.id_category = 1;

            await ProductController.findByCategory(req, res, next);

            expect(res.status).toHaveBeenCalledWith(501);
            expect(res.json).toHaveBeenCalledWith({
                message: errorMessage,
                success: false,
                error: expect.any(Error),
            });
            expect(next).not.toHaveBeenCalled();
        });
    });

    // Prueba para create
    describe('create', () => {
        test('debería crear un producto correctamente', async () => {
            const expectedProduct = { id: 1, name: 'Product1' };
            const expectedFiles = [
                { /* imagen 1 */ },
                { /* imagen 2 */ },
            ];

            Product.create.mockResolvedValue({ id: 1 });
            Product.update.mockResolvedValue();

            req.body.product = expectedProduct;
            req.files = expectedFiles;

            await ProductController.create(req, res, next);

            // Espera a que todas las funciones asíncronas se completen
            await new Promise(resolve => setImmediate(resolve));

            expect(Product.create).toHaveBeenCalledWith(expectedProduct);
            expect(Product.update).toHaveBeenCalledWith(expectedProduct);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({
                success: true,
                message: 'El producto se ha registrado correctamente',
            });
            expect(next).not.toHaveBeenCalled();
        });

        test('debería manejar errores al crear un producto', async () => {
            const expectedErrorMessage = 'Error al registrar el producto';
            const expectedFiles = [
                { /* Datos de archivo de imagen 1 */ },
                { /* Datos de archivo de imagen 2 */ },
            ];

            Product.create.mockRejectedValue(new Error(expectedErrorMessage));

            req.files = expectedFiles;

            await ProductController.create(req, res, next);

            expect(Product.create).toHaveBeenCalled();
            expect(Product.update).not.toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(501);
            expect(res.json).toHaveBeenCalledWith({
                message: expectedErrorMessage,
                success: false,
                error: expect.any(Error),
            });
            expect(next).not.toHaveBeenCalled();
        });

        // Puedes agregar más pruebas para manejar diferentes casos y condiciones
    });
});
