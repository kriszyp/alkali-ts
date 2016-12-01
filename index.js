"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/// <reference path="./node_modules/alkali/typings.d.ts" />
require('reflect-metadata');
var alkali_1 = require('alkali');
function reactive(target, key) {
    var Type = Reflect.getMetadata('design:type', target, key);
    console.log(Type);
    Object.defineProperty(target, key, {
        get: function () {
            var property = (this._properties || (this._properties = {}))[key];
            if (!property) {
                this._properties[key] = property = new alkali_1.Variable();
                property.key = key;
                property.parent = this;
            }
            return property;
        },
        set: function (value) {
            this[key]._changeValue(null, 4, value);
        },
        enumerable: true,
        writable: true,
        configurable: true
    });
}
var MyClass = (function (_super) {
    __extends(MyClass, _super);
    function MyClass() {
        _super.apply(this, arguments);
    }
    __decorate([
        reactive, 
        __metadata('design:type', String)
    ], MyClass.prototype, "name", void 0);
    __decorate([
        reactive, 
        __metadata('design:type', Number)
    ], MyClass.prototype, "age", void 0);
    return MyClass;
}(alkali_1.Variable));
var mc = new MyClass({
    name: 'John'
});
/*let v = new Variable('s')
let MyVar = Variable({foo: Variable})
v.put('hi')
let mv = new MyVar()
mv.foo.put(33)
mv.foo.valueOf()*/
var test = alkali_1.Div('.test', document.createTextNode('hi'));
document.body.appendChild(new alkali_1.Div(mc.name));
mc.name = 'New Name';
