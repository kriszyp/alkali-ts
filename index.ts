/// <reference path="./node_modules/alkali/typings.d.ts" />
import 'reflect-metadata'
import { reactive } from 'alkali/extensions/typescript'
import { Variable, VArray, VString, VNumber, Div, react, Label, Input } from 'alkali'


//function Foo(props: Variable) { }

// Fails type checking
//let f = new Foo(new Variable([1, 4, 5]))
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


let newPerson = new Person()
let test = Div('.test', document.createTextNode('hi'))
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

newPerson.lastName.put('Smith')
newPerson.age.put(39)
newPerson.address.state.put('UT')
newPerson.otherAddresses.push({state: 'OR'})