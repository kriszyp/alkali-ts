/// <reference path="./node_modules/alkali/typings.d.ts" />
import { Variable, VArray, VString, VNumber, Div, react, Label, Input } from 'alkali'

// this defines a structured variable, and typescript understands the typing that it defines
const Address = Variable.with({
  street: VString,
  state: VString,
  zip: VNumber
})

class Person extends Variable.with({
  firstName: VString,
  lastName: VString,
  age: VNumber,
  address: Address,
  otherAddresses: VArray.of(Address)
}) {
  fullName = react(function*() {
    return `${yield this.firstName} ${yield this.lastName}`
  }.bind(this))
}
const SpecialPerson = Person.with({
  birthday: VNumber
})

let newPerson = new SpecialPerson()

console.log(newPerson.fullName)
let test = Div('.test', document.createTextNode('hi'))
let p = new Person()
document.body.appendChild(new Div([
  Div([
    Label([
      'First Name: ',
      Input(newPerson.firstName)
    ]),
    Label([
      ' Last Name: ',
      Input(newPerson.lastName)
    ])
  ]),
  Div(['Full Name: ', newPerson.fullName]),
  Div(['Age: ', newPerson.age]),
  Div(['From: ', newPerson.address.state]),
  Div(['Other addresses: ',
    Div(newPerson.otherAddresses.map(address =>
      Div(['state: ', address.state]))),
    Div(newPerson.otherAddresses.map(address =>
      Input(address.state)))
  ])
]))

newPerson.firstName.put('John')
newPerson.lastName.put('Smith')
newPerson.age.put(39)
newPerson.address.state.put('UT')
newPerson.otherAddresses.push({state: 'OR'})