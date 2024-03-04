// jest.config.js
module.exports = {
    testEnvironment: 'node',
    moduleFileExtensions: ['js', 'json'],
    automock: false,
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.js$', // Este patrón buscará archivos que coincidan con *.test.js o *.spec.js
    moduleNameMapper: {
      // Puedes utilizar este objeto para hacer mapeos de módulos si es necesario
    },
    // Otros ajustes de configuración aquí
  };
  