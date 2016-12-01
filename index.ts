/// <reference path="./node_modules/alkali/typings.d.ts" />
import 'reflect-metadata'
import { Variable, Div } from 'alkali'

function reactive(target: any, key: string) {
  let Type = Reflect.getMetadata('design:type', target, key)
  console.log(Type)
  Object.defineProperty(target, key, {
    get: function() {
      var property = (this._properties || (this._properties = {}))[key]
      if (!property) {
        this._properties[key] = property = new Variable()
        property.key = key
        property.parent = this
      }
      return property
    },
    set: function(value) {
      this[key]._changeValue(null, 4, value)
    },
    enumerable: true,
    configurable: true
  })
}

class MyClass extends Variable {
  @reactive
  name: string
  @reactive
  age: number
}
let mc = new MyClass({
  name: 'John'
})
/*let v = new Variable('s')
let MyVar = Variable({foo: Variable})
v.put('hi')
let mv = new MyVar()
mv.foo.put(33)
mv.foo.valueOf()*/
let test = Div('.test', document.createTextNode('hi'))
document.body.appendChild(new Div([
  Div(['Name:', mc.name]),
  Div(['Age:', mc.age])
]))

mc.name = 'New Name'
mc.age = 23