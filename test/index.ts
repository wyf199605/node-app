console.log('test');

let method: MethodDecorator = (target: typeof Test, key: string, descriptor: PropertyDescriptor) => {
    console.log(target);
};

class Test{
    age: number;
    name: string;
    constructor(){
        this.name = 'wyf'
    }

    @method
    static hello(){

    }
}

class a {
    namea: string;

}

class b {
    nameb: string;
    changeb() {
        this.nameb = 'changed';
    }
}

class c implements a, b {
    namea: string;
    nameb: string;

    changeb(): void { }
}

let e: obj
