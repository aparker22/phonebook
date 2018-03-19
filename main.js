var fs = require('fs');
var readline = require('readline');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


var optionOne = function() {
    rl.question('Name:  ', function(name) {
        fs.readFile('phonebook.txt', function(err, data){
            var stringData = data.toString(); 
            var phoneList = stringData.split("\n")
            phoneList.forEach(function(entry) {
                if (entry.includes(name)) {
                    console.log(entry);
                }
            })
            initiatePhonebook();
    })
    })
};

var optionTwo = function() {
    rl.question('First Name: ', function (firstName) {
        rl.question('Last Name: ', function (lastName) {
            rl.question('Phone Number: ', function (phoneNumber) {
                var entry = `\n${firstName} ${lastName} ${phoneNumber}`
                fs.appendFile('phonebook.txt', entry, function(err) {
                    if (err) {
                        console.log(err)
                    } else {
                        console.log('Entry Saved');
                    }
                    initiatePhonebook();
                })
                });
            })
    })
}

var optionThree = function() {
    rl.question('Name:  ', function(name) {
        fs.readFile('phonebook.txt', function(err, data){
            var stringData = data.toString(); 
            var phoneList = stringData.split("\n")
            phoneList.forEach(function(entry, i) {
                if (entry.includes(name)) {
                    phoneList.splice(i, 1);
                    console.log('Entry Deleted')
                }
            })
            fs.writeFile('phonebook.txt', '', function (err) {
                if (err) {
                    console.log(err);
                }
            })
            phoneList.forEach(function (entry) {
                fs.appendFile('phonebook.txt', (entry + '\n'), function (err) {
                    if (err) {
                        console.log(err);
                    } 
                })
            })
            initiatePhonebook();
        })
    })
};

var optionFour = function() {
    fs.readFile('phonebook.txt', function(err, data){
    var stringData = data.toString();
    console.log(stringData);
    initiatePhonebook();
    })
}

var initiatePhonebook = function() {
    rl.question ('Choose an option: 1. Look up an entry, 2. Set an entry, 3. Delete an entry, 4. List all entries, 5. Quit  ', function(option) {
        var optionNum = Number(option)
        if (optionNum ===1) {
            optionOne();
        } else if (optionNum === 2) {
            optionTwo();
        } else if (optionNum ===3) {
            optionThree();
        } else if (optionNum ===4) {
            optionFour();
        } else if (optionNum === 5) {
            rl.close()
        }
    })
}

module.exports = initiatePhonebook;
