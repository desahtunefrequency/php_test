document.getElementById('updateButton').addEventListener('click', function(event) {
    event.preventDefault();

    var userId = document.getElementById('userId').value;
    var fullname = document.getElementById('fullname').value;
    var username = document.getElementById('username').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    var formData = new FormData();
    formData.append('fullname', fullname);
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('id', userId);

    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'api.php', true);
    xhr.onload = function() {
        if (this.status == 200) {
            loadUsers();
            clearFormFields();
        }
    }
    xhr.send(formData);
});


document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();

    var userId = document.getElementById('userId').value;
    var fullname = document.getElementById('fullname').value;
    var username = document.getElementById('username').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    var formData = new FormData();
    formData.append('fullname', fullname);
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password', password);
    if (userId) {
        formData.append('id', userId);
    }

    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'api.php', true);
    xhr.onload = function() {
        if (this.status == 200) {
            loadUsers();
            clearFormFields();
        }
    }
    xhr.send(formData);
});

document.getElementById('userTable').addEventListener('click', function(event) {
    if (event.target.tagName === 'TD') {
        var id = event.target.parentElement.id;
        var fullname = event.target.parentElement.querySelector('.fullname').textContent;
        var username = event.target.parentElement.querySelector('.username').textContent;
        var email = event.target.parentElement.querySelector('.email').textContent;

        document.getElementById('userId').value = id;
        document.getElementById('fullname').value = fullname;
        document.getElementById('username').value = username;
        document.getElementById('email').value = email;
    }
});

document.getElementById('deleteButton').addEventListener('click', function(event) {
    var id = document.getElementById('userId').value;

    var formData = new FormData();
    formData.append('id', id);
    formData.append('_method', 'DELETE');

    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'api.php', true);
    xhr.onload = function() {
        if (this.status == 200) {
            loadUsers();
            clearFormFields();
        }
    }
    xhr.send(formData);
});

function loadUsers() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'api.php', true);
    xhr.onload = function() {
        if (this.status == 200) {
            var users = JSON.parse(this.responseText);
            var output = '';
            for (var i in users) {
                output += '<tr id="' + users[i].id + '">' +
                    '<td class="fullname">' + users[i].fullname + '</td>' +
                    '<td class="username">' + users[i].username + '</td>' +
                    '<td class="email">' + users[i].email + '</td>' +
                    '</tr>';
            }
            document.getElementById('userTable').querySelector('tbody').innerHTML = output;
        }
    }
    xhr.send();
}

function clearFormFields() {
    document.getElementById('userId').value = '';
    document.getElementById('fullname').value = '';
    document.getElementById('username').value = '';
    document.getElementById('email').value = '';
    document.getElementById('password').value = '';
}

loadUsers();
