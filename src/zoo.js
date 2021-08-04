const {
  species,
} = require('./data');
const data = require('./data');

function getSpeciesByIds(...ids) {
  return ids.map((id) => (species.find((elem) => (elem.id === id))));

  // retonar um array dentro de array.
  // return ids.map((id) => (species.filter((elem) => (elem.id === id))));

  // const filtro = ids.map((id) => species.filter((elem) => (elem.id === id)));
  // return (filtro.length > 1 ? filtro.reduce((acc, curr) => [...acc, ...curr]) : filtro);

  // return ids.map((id) => species.filter((elem) => (elem.id === id)));

  // return species.map((e) => ids.filter((elem) => elem === e.id));
  // return Object.assign([], species.filter((elem) => elem.id === ids));
  // return species.reduce((acc, curr) => (curr.id === ids ? acc.concat(curr) : acc));
}

function getAnimalsOlderThan(animal, age) {
  // seu código aqui
}

function getEmployeeByName(employeeName) {
  // seu código aqui
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
}

function isManager(id) {
  // seu código aqui
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  // seu código aqui
}

function countAnimals(speciess) {
  // seu código aqui
}

function calculateEntry(entrants) {
  // seu código aqui
}

function getAnimalMap(options) {
  // seu código aqui
}

function getSchedule(dayName) {
  // seu código aqui
}

function getOldestFromFirstSpecies(id) {
  // seu código aqui
}

function increasePrices(percentage) {
  // seu código aqui
}

function getEmployeeCoverage(idOrName) {
  // seu código aqui
}

module.exports = {
  calculateEntry,
  getSchedule,
  countAnimals,
  getAnimalMap,
  getSpeciesByIds,
  getEmployeeByName,
  getEmployeeCoverage,
  addEmployee,
  isManager,
  getAnimalsOlderThan,
  getOldestFromFirstSpecies,
  increasePrices,
  createEmployee,
};
