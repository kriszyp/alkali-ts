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
This is because the property values themselves (as returned by the getters) are self-contained reactive values. So we can also do:
```
let name = mc.name
mc.name = 'John'
name.valueOf() -> 'John'
name.put('World')
'Hi, ' + mc.name -> 'Hi, World'
```

The `index.ts` shows more examples of usage.

### Installation
`npm install`
`npm run build`

### Babel
FYI, the same `reactive` decorators can be used with the [Alkali babel plugin](https://github.com/kriszyp/babel-plugin-transform-alkali)