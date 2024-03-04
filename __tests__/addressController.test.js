const AddressController = require('../controllers/addressController');
const Address = require('../models/address');

// Mocks y configuración de pruebas
jest.mock('../models/address');

describe('Address Controller', () => {
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

  // Prueba para findByUser
  describe('findByUser', () => {
    test('debería obtener direcciones por usuario correctamente', async () => {
      const expectedData = [{ id: 1, address: 'Dirección1' }];
      Address.findByUser.mockResolvedValue(expectedData);

      req.params.id_user = 1;

      await AddressController.findByUser(req, res, next);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(expectedData);
      expect(next).not.toHaveBeenCalled();
    });

    test('debería manejar errores al obtener direcciones por usuario', async () => {
      const errorMessage = 'Hubo un error al tratar de obtener las direcciones';
      Address.findByUser.mockRejectedValue(new Error(errorMessage));

      req.params.id_user = 1;

      await AddressController.findByUser(req, res, next);

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
    test('debería crear una nueva dirección correctamente', async () => {
      const expectedAddress = { id: 1, address: 'Dirección1' };

      Address.create.mockResolvedValue(expectedAddress);

      req.body = expectedAddress;

      await AddressController.create(req, res, next);

      expect(Address.create).toHaveBeenCalledWith(expectedAddress);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: 'La direccion se creo correctamente',
        data: expectedAddress.id,
      });
      expect(next).not.toHaveBeenCalled();
    });

    test('debería manejar errores al crear una nueva dirección', async () => {
      const expectedErrorMessage = 'Hubo un error creando la direccion';
      const expectedAddress = { id: 1, address: 'Dirección1' };

      Address.create.mockRejectedValue(new Error(expectedErrorMessage));

      req.body = expectedAddress;

      await AddressController.create(req, res, next);

      expect(Address.create).toHaveBeenCalledWith(expectedAddress);
      expect(res.status).toHaveBeenCalledWith(501);
      expect(res.json).toHaveBeenCalledWith({
        message: expectedErrorMessage,
        success: false,
        error: expect.any(Error),
      });
      expect(next).not.toHaveBeenCalled();
    });
  });

  // Puedes agregar más pruebas para manejar diferentes casos y condiciones
});
