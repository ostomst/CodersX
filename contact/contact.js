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

const database = '/home/namvu/Study/CodersX/contact/data.json';
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

function update(name, data, newData) {
  for (let i = 0; i < data.length; i += 1) {
    if (data[i].name === name) {
      data[i] = newData;
    }
  }

  fs.writeFileSync(database, JSON.stringify(data));
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

function showMenuAgain() {
  const again = req.question('Do you want to continue?(y/n)  ');
  if (again === 'y') {
    showMenu();
  } else {
    option = 'n';
  }
}

function showAllContact() {
  const data = JSON.parse(fs.readFileSync(database));
  console.log(data);
}

function createNewContact() {
  const data = JSON.parse(fs.readFileSync(database));
  const name = req.question('Name to create:  ');
  const phone = req.question('Phone Number is: ');
  const newContact = new Contact(name, phone);
  data.push(newContact);
  fs.writeFileSync(database, JSON.stringify(data));
  console.log(newContact);
}

function editContact() {
  const data = JSON.parse(fs.readFileSync(database));
  const contactToEdit = searchContact(data);
  const nameOrPhone = req.question(`Choose what information you want to edit
                                    1. Name.
                                    2. Phone Number.
                                    3. Both name and phone number`);
  switch (nameOrPhone) {
    case '1': {
      const newData = {
        name: req.question('Name to edit:  '),
        phone: contactToEdit[0].phone,
      };
      update(contactToEdit[0].name, data, newData);
      break;
    }
    case '2': {
      const newData = {
        name: contactToEdit[0].name,
        phone: req.question('Phone is:  '),
      };
      update(contactToEdit[0].name, data, newData);
      break;
    }

    case '3': {
      const newData = {
        name: req.question('Name edit:  '),
        phone: req.question('Phone is:  '),
      };
      update(contactToEdit[0].name, data, newData);
      break;
    }
    default:
      break;
  }
}

function deleteContact() {
  const data = JSON.parse(fs.readFileSync(database));
  const contactToDelete = searchContact(data);
  for (let i = 0; i < data.length; i += 1) {
    if (data[i].name === contactToDelete[0].name) {
      data.splice(i, 1);
    }
  }
  fs.writeFileSync(database, JSON.stringify(data));
  showAllContact();
}

showMenu();

while (option !== 'n') {
  switch (option) {
    case '1': {
      showAllContact();
      showMenuAgain();
      break;
    }
    case '2': {
      createNewContact();
      showMenuAgain();
      break;
    }
    case '3': {
      editContact();
      showMenuAgain();
      break;
    }
    case '4': {
      deleteContact();
      showMenuAgain();
      break;
    }
    default:
      break;
  }
}
