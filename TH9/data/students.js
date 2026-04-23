let students = [
    { id: 1, name: "Nguyen Van A", email: "a@gmail.com", age: 20, class: "CNTT1", isDeleted: false },
    { id: 2, name: "Tran Thi B",   email: "b@gmail.com", age: 21, class: "CNTT1", isDeleted: false },
    { id: 3, name: "Le Van C",     email: "c@gmail.com", age: 22, class: "CNTT1", isDeleted: false },
    { id: 4, name: "Pham Thi D",   email: "d@gmail.com", age: 23, class: "CNTT2", isDeleted: false },
    { id: 5, name: "Hoang Van E",  email: "e@gmail.com", age: 24, class: "CNTT2", isDeleted: false },
    { id: 6, name: "Nguyen Thi F", email: "f@gmail.com", age: 19, class: "CNTT2", isDeleted: false },
    { id: 7, name: "Tran Van G",   email: "g@gmail.com", age: 20, class: "CNTT3", isDeleted: false },
    { id: 8, name: "Le Thi H",     email: "h@gmail.com", age: 21, class: "CNTT3", isDeleted: false },
    { id: 9, name: "Pham Van I",   email: "i@gmail.com", age: 22, class: "CNTT3", isDeleted: true  },
    { id: 10, name: "Hoang Thi J", email: "j@gmail.com", age: 23, class: "CNTT3", isDeleted: true  },
];

let nextId = 11;

module.exports = { students, getNextId: () => nextId++ };