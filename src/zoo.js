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

// Funções auxiliares para o requisito 9
const funAux = {
  // Rentorna array de animais por local, para cara alocal: ('NE') => ['lions', 'giraffes'];
  arrayAnimalPorLocal: (local) => species
    .reduce((a, e) => (e.location === local ? a.concat(e.name) : a), []),
  // Cria obj, {'NE': [vazio], 'NW': [], ...}
  objetoPrincipal: species.reduce((a, e) => { const t = a; t[e.location] = []; return t; }, {}),

  // ('lions') => [nomes, nomes]
  arrayNomesPorAnimal: (eAni) => species.find((e) => e.name === eAni)
    .residents.map((g) => (g).name),
  // (arrayAnimal) => [{animal: [names,names]},{animal: [names...]...}] [array com Objetos{ animal: [array Names]}]
  arryObjetoAnimalNomes: (arrayName) => arrayName.map((e) => {
    const t = {}; t[e] = funAux.arrayNomesPorAnimal(e); return t;
  }),
  // Passa no requisito 2/6 // Acessa as chaves de locais e cria: faz a fusão dos dois objetos.
  fusaoObjetoNormal: () => Object.entries(funAux.objetoPrincipal).forEach((e) => {
    funAux.objetoPrincipal[e[0]] = funAux.arryObjetoAnimalNomes(funAux.arrayAnimalPorLocal(e[0]));
  }),

  // Função para ordenar nomes.
  ordena: () => Object.entries(funAux.objetoPrincipal).map((e) => funAux.objetoPrincipal[e[0]]
    .map((g) => g[Object.keys(g)].sort())), // Passa no requisito 3/6 // Acessa a array de nomes e ordena os;

  // Funções criadas para o uso do parametro: options.sex
  // ('male', 'lions') => ['Maxwell', 'Faustino'], Busca personalisada, por sex
  buscaSex: (sexGenero, eAnimal) => species.find((e) => e.name === eAnimal)
    .residents.filter((g) => (g).sex === sexGenero).map((e) => e.name),
  // Monta array, (['lions', 'giraffes'], 'male') => [{...},{...}]
  arrObjNomPorSex: (arrayAnimais, generoSex) => arrayAnimais
    .map((e) => { const t = {}; t[e] = funAux.buscaSex(generoSex, e); return t; }),
  // Faz a fusão dos dois arrays
  criaObjPorSex: (genero) => Object.entries(funAux.objetoPrincipal).forEach((e) => {
    funAux.objetoPrincipal[e[0]] = funAux.arrObjNomPorSex(funAux.arrayAnimalPorLocal(e[0]), genero);
  }),
  // If do sex
  retornoSexTrue: '',
};

function condicaoSex(paramSex, paramSorted) {
  funAux.criaObjPorSex(paramSex);
  if (paramSorted) funAux.ordena();
}

// Funções de verificação
const trueOptions = (parametroObjeto) => {
  const { includeNames, sorted, sex } = parametroObjeto;
  if (includeNames) {
    funAux.fusaoObjetoNormal();
    if (sorted) funAux.ordena();
    if (sex) condicaoSex(sex, sorted);
  }
};

function getAnimalMap(options) {
  if (!options || !options.includeNames) {
    Object.entries(funAux.objetoPrincipal).forEach((e) => {
      funAux.objetoPrincipal[e[0]] = funAux
        .arrayAnimalPorLocal(e[0]);
    }); // pega o obj e faz adiciona valores, {NE: ['lions', 'giraffes'], ...}
  } else {
    trueOptions(options); // Se options for true
  }
  return funAux.objetoPrincipal;
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
