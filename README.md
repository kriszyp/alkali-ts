This project is used starting point/boilerplate for using Alkali with TypeScript. One of the most exciting integrations is reactive properties. You can define a class with reactive properties like:

```
import 'reflect-metadata'
import { Variable, reactive, Div } from 'alkali'

class MyClass extends Variable {
  @reactive
  name: string
  @reactive
  age: number
}
```
And then use reactive properties directly in element constructors:
```
let test = Div('.test', document.createTextNode('hi'))
document.body.appendChild(new Div([
  Div(['Name:', mc.name]),
  Div(['Age:', mc.age])
]))
```
And then any assignments to the reactive properties cause reactive updates in the UI!
```
mc.name = 'New Name'
mc.age = 23
```