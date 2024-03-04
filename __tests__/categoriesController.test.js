const categoryController = require('../controllers/categoriesController');
const Category = require('../models/category');

describe('Category Controller', () => {
  describe('getAll', () => {
    test('debería obtener todas las categorías correctamente', async () => {
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const next = jest.fn();

      // Simula el comportamiento de la función de modelo Category
      const categoriasMock = [{ id: 1, nombre: 'Categoria1' }, { id: 2, nombre: 'Categoria2' }];
      Category.getAll = jest.fn().mockResolvedValue(categoriasMock);

      await categoryController.getAll(req, res, next);

      // Verifica que la función esperada se haya llamado
      expect(Category.getAll).toHaveBeenCalled();

      // Verifica la respuesta enviada
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(categoriasMock);

      // Verifica que next no haya sido llamado (no se esperan errores)
      expect(next).not.toHaveBeenCalled();
    });

    test('debería manejar errores al obtener categorías', async () => {
      // Simula un error al obtener categorías
      const errorMock = new Error('Error al obtener categorías');
      Category.getAll = jest.fn().mockRejectedValue(errorMock);

      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const next = jest.fn();

      await categoryController.getAll(req, res, next);

      // Verifica que la función esperada se haya llamado
      expect(Category.getAll).toHaveBeenCalled();

      // Verifica la respuesta enviada
      expect(res.status).toHaveBeenCalledWith(501);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Hubo un error al tratar de obtener las categorias',
        error: errorMock.message,
        success: false,
      });

      // Verifica que next no haya sido llamado (no se esperan errores)
      expect(next).not.toHaveBeenCalled();
    });
  });

  describe('create', () => {
    test('debería crear una categoría correctamente', async () => {
      const req = {
        body: {
          nombre: 'NuevaCategoria',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const next = jest.fn();

      // Simula el comportamiento de la función de modelo Category
      const categoriaCreadaMock = { id: 3, nombre: 'NuevaCategoria' };
      Category.create = jest.fn().mockResolvedValue(categoriaCreadaMock);

      await categoryController.create(req, res, next);

      // Verifica que la función esperada se haya llamado
      expect(Category.create).toHaveBeenCalledWith(req.body);

      // Verifica la respuesta enviada
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        message: 'La categoria se creo correctamente',
        success: true,
        data: categoriaCreadaMock.id,
      });

      // Verifica que next no haya sido llamado (no se esperan errores)
      expect(next).not.toHaveBeenCalled();
    });

    test('debería manejar errores al crear una categoría', async () => {
      // Simula un error al crear una categoría
      const errorMock = new Error('Error al crear categoría');
      Category.create = jest.fn().mockRejectedValue(errorMock);

      const req = {
        body: {
          nombre: 'NuevaCategoria',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const next = jest.fn();

      await categoryController.create(req, res, next);

      // Verifica que la función esperada se haya llamado
      expect(Category.create).toHaveBeenCalledWith(req.body);

      // Verifica la respuesta enviada
      expect(res.status).toHaveBeenCalledWith(501);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Hubo un error al crear la categoria',
        success: false,
        error: errorMock.message,
      });

      // Verifica que next no haya sido llamado (no se esperan errores)
      expect(next).not.toHaveBeenCalled();
    });
  });
});
