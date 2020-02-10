module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  moduleNameMapper: {
    '^~app/(.*)$': '<rootDir>/app/$1',
    '^~core/(.*)$': '<rootDir>/core/$1',
    '^~helpers/(.*)$': '<rootDir>/helpers/$1',
    '^~modules/(.*)$': '<rootDir>/modules/$1',
    '^~shared/(.*)$': '<rootDir>/shared/$1'
  },
  testRegex: '.spec.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest'
  },
  coverageDirectory: '../coverage',
  testEnvironment: 'node'
};
