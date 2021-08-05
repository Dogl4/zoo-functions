const {
  species, employees,
} = require('./data');
const data = require('./data');

function getSpeciesByIds(...ids) { // Acessa os ids, depois verifica id por id e retorna 1
  return ids.map((id) => (species.find((elem) => (elem.id === id))));
  // find retorna somente um, entretando o map já está percorrendo o array.
  // retonar um array dentro de array.
  // return ids.map((id) => (species.filter((elem) => (elem.id === id))));

  // const filtro = ids.map((id) => species.filter((elem) => (elem.id === id)));
  // return (filtro.length > 1 ? filtro.reduce((acc, curr) => [...acc, ...curr]) : filtro);

  // return ids.map((id) => species.filter((elem) => (elem.id === id)));

  // return species.map((e) => ids.filter((elem) => elem === e.id));
  // return Object.assign([], species.filter((elem) => elem.id === ids));
  // return species.reduce((acc, curr) => (curr.id === ids ? acc.concat(curr) : acc));
}

function getAnimalsOlderThan(animal, age) { // some() um for true && every() * trues
  return species.some((elem) => elem.name === animal && elem.residents.every((e) => e.age >= age));
}

function getEmployeeByName(employeeName) {
  if (!employeeName) return {}; // se for undefined
  return employees.find((e) => employeeName === e.firstName || employeeName === e.lastName);
} // busca no exportado, dentro da chave, se um dos dois existe, e obtem o primeiro, find().

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith }; // fusão de dois objetos.
}

function isManager(id) {
  return employees.some((e) => e.id === id)
  && employees.some((el) => el.managers.some((ele) => ele === id));
  // Verifica se existe este id vinculado a algum funcionário, e se em algum dos funcionários, na chave managers, este array, contém este id.
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) { // Default params
  return data.employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function countAnimals(speciess) {
  const hu = {};
  data.species.forEach((obj) => { hu[obj.name] = obj.residents.length; });
  return (!speciess ? hu : data.species.find((ele) => ele.name === speciess).residents.length);
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
