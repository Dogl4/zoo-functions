const {
  species, employees, prices,
} = require('./data');
const data = require('./data');

function getSpeciesByIds(...ids) {
  return ids.map((id) => (species.find((elem) => (elem.id === id)))); // Acessa os ids, depois verifica id por id e retorna 1
}

function getAnimalsOlderThan(animal, age) {
  return species.some((elem) => elem.name === animal && elem.residents.every((e) => e.age >= age)); // some() um for true && every() * trues
}

function getEmployeeByName(employeeName) {
  if (!employeeName) return {}; // se for undefined
  return employees.find((e) => employeeName === e.firstName || employeeName === e.lastName); // busca no exportado, dentro da chave, se um dos dois existe, e obtem o primeiro, find().
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith }; // fusão de dois objetos.
}

function isManager(id) {
  return employees.some((e) => e.id === id) // Verifica se existe este id vinculado a algum funcionário, e se em algum dos funcionários, na chave managers, este array, contém este id.
  && employees.some((el) => el.managers.some((ele) => ele === id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) { // Default params
  return data.employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function countAnimals(speciess) {
  const hu = {}; // Cria um objeto, {names: residentes.length, ...} Se for falsty
  data.species.forEach((obj) => { hu[obj.name] = obj.residents.length; }); // Referencia <https://developer.mozilla.org/en-US/docs/Glossary/Falsy>
  return (!speciess ? hu : data.species.find((ele) => ele.name === speciess).residents.length); // olhe a diferença de species para specieSS
}

function calculateEntry(entrants = {}) {
  return Object.entries(entrants).reduce((a, e) => (prices[e[0]] * e[1]) + a, 0);
  // Transforma objeto em array dentro de array, usa o reduce para acessar os dados do objeto principal a partir do array que transformamos.
}

// Funções para criar objeto principal. com chaves dos locais, usado os locais fornecidos pelo objeto principal: species.
const ar = (local) => species.reduce((a, e) => (e.location === local ? a.concat(e.name) : a), []); // Rentorna array de animais por local, para cara alocal: ('NE') => ['lions', 'giraffes'];
const obj = species.reduce((a, e) => { const t = a; t[e.location] = []; return t; }, {}); // Cria obj, {'NE': [vazio], 'NW': [], ...}

const anNome = (eAni) => species.find((e) => e.name === eAni).residents.map((g) => (g).name); // ('lions') => [nomes, nomes]
const arNam = (arrayName) => arrayName.map((e) => { const t = {}; t[e] = anNome(e); return t; }); // (arrayAnimal) => [{animal: [names,names]},{animal: [names...]...}] [array com Objetos{ animal: [array Names]}]
const includeNam = () => Object.entries(obj).forEach((e) => { obj[e[0]] = arNam(ar(e[0])); }); // Passa no requisito 2/6 // Acessa as chaves de locais e cria: faz a fusão dos dois objetos.

// Função para ordenar nomes.
const sortNa = () => Object.entries(obj).map((e) => obj[e[0]].map((g) => g[Object.keys(g)].sort())); // Passa no requisito 3/6 // Acessa a array de nomes e ordena os;

// Funções criadas para o uso do parametro: options.sex
const buscaSex = (sexGenero, eAnimal) => species.find((e) => e.name === eAnimal)
  .residents.filter((g) => (g).sex === sexGenero).map((e) => e.name); // ('male', 'lions') => ['Maxwell', 'Faustino'], Busca personalisada, por sex
const arrayObjetosNomesPorSex = (arrayAnimais, generoSex) => arrayAnimais
  .map((e) => { const t = {}; t[e] = buscaSex(generoSex, e); return t; }); // Monta array, (['lions', 'giraffes'], 'male') => [{...},{...}]
const criaObjPorSex = (genero) => Object.entries(obj) // Faz a fusão dos dois arrays
  .forEach((e) => { obj[e[0]] = arrayObjetosNomesPorSex(ar(e[0]), genero); });

// Funções de verificação
const trueOptions = (parametroObjeto) => {
  const { includeNames, sorted, sex } = parametroObjeto;
  if (includeNames) {
    includeNam();
    if (sorted) sortNa();
    if (sex) {
      criaObjPorSex(sex);
      if (sorted) sortNa();
    }
  }
};

function getAnimalMap(options) {
  if (!options) Object.entries(obj).forEach((e) => { obj[e[0]] = ar(e[0]); }); // pega o obj e faz adiciona valores, {NE: ['lions', 'giraffes'], ...}
  else {
    trueOptions(options); // Se options for true
  }
  return obj;
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
