var http = require ('http')
var contacts = []
var contactID = 0


var server = http.createServer(function(request, response) {
    var urlID = Number(request.url.split('/contacts/')[1])
    if (request.url === '/contacts') {
        if (request.method === 'GET') {
            response.end(JSON.stringify(contacts));
        } else if (request.method === 'POST') {
            var body = '';
            request.on('data', function(chunk) {
                body += chunk.toString();
            });
            request.on('end', function() {
                var contact = JSON.parse(body);
                contact.id = ++contactID;
                contacts.push(contact);
                response.end('Entry Added');
            })
        }
    } else if (Number.isInteger(urlID)) {
        if (request.method === 'GET') {;
            contacts.forEach(function(entry) {
                if (entry.id === urlID) {
                    response.end(JSON.stringify(entry));
                }
            })
        } else if (request.method === 'PUT') {
            var updateEntry = '';
            request.on('data', function(chunk) {
                updateEntry += chunk.toString();
            });
            request.on('end', function() {
                var updateContact = JSON.parse(updateEntry);
                contacts.forEach(function(entry, i) {
                if (entry.id === urlID) {
                    contacts.splice(i, 1, updateContact)
                    response.end('Entry Updated');
                }
            })
        })
        } else if (request.method === 'DELETE') {
            contacts.forEach(function(entry, i) {
                if (entry.id === urlID) {
                    contacts.splice(i, 1)
                    response.end('Entry Deleted')
                }
            })
        } else if (request.method === 'POST') {
            response.end('Unable to create new entry in this index')
        }
    } else {
        response.end('Unable to communicate')
    }
});

server.listen(3000);
