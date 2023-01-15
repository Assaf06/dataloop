type Employee = {
    readonly id: number,
    name: string,
    retire: (date: Date) => void
}

let employee: Employee = {
    id: 1,
    name: 'Mosh',
    retire: (date: Date) => {
        console.log(date)

    }
};


function kgToLbs(weight: number | string): number {
    //Narrowing
    if (typeof weight === 'number')
        return weight * 2.2;
    else
        return parseInt(weight) * 2.2;

}
kgToLbs(10);
kgToLbs('10kg')

type Draggable = {
    drag: () => void
};
type Resizable = {
    resize: () => void
};

type UIWidget = Draggable & Resizable;

let textBox: UIWidget = {
    drag: () => { },
    resize: () => { },
}
//Literal (exact,specific)
type Quantity = 50 | 100;
let quantity: Quantity = 100;

function greet(name: string | null | undefined) {
    if (name)
        console.log(name.toUpperCase());
    else
        console.log('Hola!');
}

greet(null);


type Customer = {
    birthday?: Date
}

function getCustomer(id: number): Customer | null | undefined {
    return id === 0 ? null : { birthday: new Date() };
}

let customer = getCustomer(0);
//optional property access opertor
console.log(customer?.birthday?.getFullYear());

//optional element access operator
//customers?.[0]

//optional call
let log: any = null;
log?.('a');

