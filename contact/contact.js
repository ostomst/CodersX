/**
 * Sử dụng kiến thức đã học, tạo ra một ứng dụng danh bạ điện thoại, có các chức năng:
 * - Nhập dữ liệu contact (name, phone number)
 * - Sửa dữ liệu contact
 * - Xoá contact
 * - Tìm kiếm contact: có thể nhập vào tên
 * (không dấu hoặc có dấu, chữ hoa hoặc chữ thường vẫn cho ra kết quả)
 * hoặc 1 phần số điện thoại
 */
const fs = require('fs');
const req = require('readline-sync');
const _ = require('lodash');


const database = './data.json';
let option;


function Contact(name, phone) {
    this.name = name;
    this.phone = phone;
}

function searchContact(data) {
    const name = req.question('Contact to edit is:  ');
    const contactFinded = data.filter((contact) => contact.name === name);
    if (_.isEmpty(contactFinded)) {
        console.log('Cant find this Contact: ');
    }
    return contactFinded;
}

function datatoEdited(data) {
    const contactToEdit = searchContact(data);
    const nameOrPhone = req.question(`Choose what information you want to edit
                                    1. Name.
                                    2. Phone Number.`);
    switch (nameOrPhone) {
        case 1:
            {
                break;
            }
        default:
            break;
    }
}

function showMenu() {
    console.log(`
        1.Show All Contact.
        2.Create New Contact.
        3.Edit Contact.
        4.Delete Contact.
    `);
    option = req.question('What do you want?  ');
}

function showAllContact() {
    const data = JSON.parse(fs.readFileSync(database));
    console.log(data);
}

function createNewContact() {
    const data = JSON.parse(fs.readFileSync(database));
    const name = req.question('Name is:  ');
    const phone = req.question('Phone Number is: ');
    const newContact = new Contact(name, phone);
    data.push(newContact);
    fs.writeFileSync(database, data);
    console.log(newContact);
}

function editContact() {
    const data = JSON.parse(fs.readFileSync(database));
    const contactEdited = datatoEdited(data);

}

function deleteContact() {

}

showMenu();

while (option !== 'n') {
    switch (option) {
        case '1': {
            showAllContact();
            showMenu();
            break;
        }
        case '2': {
            createNewContact();
            showMenu();
            break;
        }
        case '3': {
            editContact();
            showMenu();
            break;
        }
        case '4': {
            deleteContact();
            showMenu();
            break;
        }
        default: {
            break;
        }
    }
}
