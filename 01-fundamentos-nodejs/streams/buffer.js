//Representação de espaço da memória do computador
//Salvar e ler na memória de forma muito performática
const buffer = Buffer.from('hello')

console.log(buffer) //dados do buffer em hexadecimal
console.log(buffer.toJSON()) //dados do buffer em decimal
console.log(buffer.toString())