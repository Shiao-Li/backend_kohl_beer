const OrderController = require('../controllers/ordersController');
const Order = require('../models/order');
const OrderHasProduct = require('../models/order_has_products');

// Mocks y configuración de pruebas
jest.mock('../models/order');
jest.mock('../models/order_has_products');

describe('Order Controller', () => {
    // Configuración común para todas las pruebas
    const req = {
        params: {},
        body: {},
    };

    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
    };

    const next = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    // Prueba para findByStatus
    describe('findByStatus', () => {
        test('debería obtener órdenes por estado correctamente', async () => {
            const expectedData = [{ id: 1, status: 'PAGADO' }];
            Order.findByStatus.mockResolvedValue(expectedData);

            req.params.status = 'PAGADO';

            await OrderController.findByStatus(req, res, next);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(expectedData);
            expect(next).not.toHaveBeenCalled();
        });

        test('debería manejar errores al obtener órdenes por estado', async () => {
            const errorMessage = 'Hubo un error al tratar de obtener las ordenes por estado';
            Order.findByStatus.mockRejectedValue(new Error(errorMessage));

            req.params.status = 'PAGADO';

            await OrderController.findByStatus(req, res, next);

            expect(res.status).toHaveBeenCalledWith(501);
            expect(res.json).toHaveBeenCalledWith({
                message: errorMessage,
                success: false,
                error: expect.any(Error),
            });
            expect(next).not.toHaveBeenCalled();
        });
    });

    // Puedes agregar más pruebas para otras funciones del controlador

    describe('create', () => {
        test('debería crear una orden correctamente', async () => {
            const expectedOrder = { id: 1, status: 'PAGADO', products: [] };

            Order.create.mockResolvedValue(expectedOrder);
            OrderHasProduct.create.mockResolvedValue();

            req.body = expectedOrder;

            await OrderController.create(req, res, next);

            expect(Order.create).toHaveBeenCalledWith(expectedOrder);
            expect(OrderHasProduct.create).toHaveBeenCalledWith(
                expectedOrder.id,
                expect.any(Number), 
                expect.any(Number)   
            );

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({
                success: true,
                message: 'La orden se creo correctamente',
                data: expectedOrder.id,
            });

            expect(next).not.toHaveBeenCalled();
        });

        test('debería manejar errores al crear una orden', async () => {
            const expectedErrorMessage = 'Hubo un error creando la orden';
            const expectedOrder = { id: 1, status: 'PAGADO', products: [] };

            Order.create.mockRejectedValue(new Error(expectedErrorMessage));

            req.body = expectedOrder;

            await OrderController.create(req, res, next);

            expect(Order.create).toHaveBeenCalledWith(expectedOrder);
            expect(OrderHasProduct.create).not.toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(501);
            expect(res.json).toHaveBeenCalledWith({
                message: expectedErrorMessage,
                success: false,
                error: expect.any(Error),
            });
            expect(next).not.toHaveBeenCalled();
        });
    });

    // Prueba para updateToDispatched
    describe('updateToDispatched', () => {
        test('debería actualizar el estado a DESPACHADO correctamente', async () => {
            const expectedOrder = { id: 1, status: 'DESPACHADO' };

            Order.update.mockResolvedValue();

            req.body = expectedOrder;

            await OrderController.updateToDispatched(req, res, next);

            expect(Order.update).toHaveBeenCalledWith(expectedOrder);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({
                success: true,
                message: 'La orden se actualizo correctamente',
            });
            expect(next).not.toHaveBeenCalled();
        });

        test('debería manejar errores al actualizar el estado a DESPACHADO', async () => {
            const expectedErrorMessage = 'Hubo un error al actualizar la orden';
            const expectedOrder = { id: 1, status: 'DESPACHADO' };

            Order.update.mockRejectedValue(new Error(expectedErrorMessage));

            req.body = expectedOrder;

            await OrderController.updateToDispatched(req, res, next);

            expect(Order.update).toHaveBeenCalledWith(expectedOrder);
            expect(res.status).toHaveBeenCalledWith(501);
            expect(res.json).toHaveBeenCalledWith({
                message: expectedErrorMessage,
                success: false,
                error: expect.any(Error),
            });
            expect(next).not.toHaveBeenCalled();
        });
    });

    // Puedes agregar más pruebas para otras funciones del controlador
});
