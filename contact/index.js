/* eslint-disable no-param-reassign */
const fs = require('fs');
const req = require('readline-sync');
const _ = require('lodash');

let choose;

function Contact(name, phoneNumber) {
    this.name = name;
    this.phone = phoneNumber;
};


function menu(string = 'What do you want?') {
    console.log(`   
    1.Create new contact
    2.Edit contact
    3.Delete contact
    4.Search for contact`);
    choose = req.question(string);
}


menu();

function checkNumeric(phone) {
    const regex = /^[0-9]+$/;
    while (!phone.match(regex)) {
        phone = req.question('Phone number must be numeric:  ');
    }
}

function updateContact(prevName, data, newData) {
    for (let i = 0; i < data.length; i += 1) {
        if (data[i].name === prevName) {
            data[i] = newData;
        }
    }
    fs.writeFileSync('./data.json', JSON.stringify(data));
    console.log(newData);
}

function searchContactTo(data, action) {
    const editName = req.question(`Contact you want to ${action}:  `);
    const editContact = data.filter((contact) => contact.name === editName);
    return editContact;
}

while (choose !== 'n') {
    switch (choose) {
        case '1':
            {
                const data = JSON.parse(fs.readFileSync('./data.json'));
                const name = req.question('Name:  ');
                const phone = req.question('Phone number:  ');

                checkNumeric(phone);

                const newcontact = new Contact(name, phone);
                data.push(newcontact);
                fs.writeFileSync('./data.json', JSON.stringify(data));

                menu('Do you want to continue?(1234/n)');
                break;
            }
        case '2':
            {
                const data = JSON.parse(fs.readFileSync('./data.json'));

                const editContact = searchContactTo(data, 'edit');

                if (_.isEmpty(editContact)) {
                    menu('Cant find this Contact. Create new contact press 1: ');
                } else {
                    choose = req.question('You want edit Name (n) or phone number (p) ');
                    switch (choose) {
                        case 'n':
                            {
                                const newData = {
                                    name: req.question('Name is:  '),
                                    phone: editContact[0].phone,
                                };
                                updateContact(editContact[0].name, data, newData);
                                break;
                            }
                        case 'p':
                            {
                                const newData = {
                                    name: editContact[0].name,
                                    phone: req.question('Phone is:  '),
                                };
                                updateContact(editContact[0].name, data, newData);
                                break;
                            }
                        default:
                            break;
                    }
                }
                break;
            }
        default:
            break;
    }
}
