/// <reference path="./node_modules/alkali/typings.d.ts" />
import 'reflect-metadata'
import { reactive } from 'alkali/extensions/typescript'
import { Variable, VArray, VString, Div, react, Label, Input } from 'alkali'


//function Foo(props: Variable) { }

// Fails type checking
//let f = new Foo(new Variable([1, 4, 5]))
let A = Variable.with({
  street: VString,
  state: VString
})
class Address2 extends A {
  another: string
}
let a = new Address2()
let v = new Variable<Date>()
let v2 = new Variable()
console.log(v.valueOf().getTime())
console.log(a.state.put('hi'), a.another + a.street)
class Address extends Variable<{}> {
  @reactive street: string
  @reactive state: string
}
const Addresses = (VArray.of(Address))
class MyClass {
  firstName = new VString('John')
  @reactive lastName: string = 'Doe'
  fullName = react(function*() {
    return `${yield this.firstName} ${yield this.lastName}`
  }.bind(this))
  @reactive age: number
  address = new Address()
  otherAddresses = new Addresses([{state: 'ID'}])
}


let mc = new MyClass()
/*let v = new Variable('s')
let MyVar = Variable({foo: Variable})
v.put('hi')
let mv = new MyVar()
mv.foo.put(33)
mv.foo.valueOf()*/
let test = Div('.test', document.createTextNode('hi'))
document.body.appendChild(new Div([
  Div([
    Label([
      'First Name: ',
      Input(mc.firstName)
    ]),
    Label([
      ' Last Name: ',
      Input(mc.lastName)
    ])
  ]),
  Div(['Full Name: ', mc.fullName]),
  Div(['Age: ', mc.age]),
  Div(['From: ', mc.address.state]),
  Div(['Other addresses: ',
    Div(mc.otherAddresses.map(address =>
      Div(['state: ', address.state]))),
    Div(mc.otherAddresses.map(address =>
      Input(address.state)))
  ])
]))

mc.lastName = 'Smith'
mc.age = 39
mc.address.state = 'UT'
mc.otherAddresses.push({state: 'OR'})