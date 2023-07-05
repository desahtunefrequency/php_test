document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();

    var userId = document.getElementById('userId').value;
    var fullname = document.getElementById('fullname').value;
    var username = document.getElementById('username').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    var params = 'fullname=' + fullname + '&username=' + username + '&email=' + email + '&password=' + password;

    if (userId) {
        params += '&id=' + userId;
    }

    var xhr = new XMLHttpRequest();
    xhr.open('POST', userId ? 'update.php' : 'register.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    xhr.onload = function() {
        if (this.status == 200) {
            alert(userId ? 'User updated successfully' : 'User registered successfully');
            loadUserList();
            clearFormFields();
        } else {
            alert('An error occurred');
        }
    };

    xhr.send(params);
});

document.getElementById('updateButton').addEventListener('click', function() {
    document.getElementById('registrationForm').dispatchEvent(new Event('submit'));
});

document.getElementById('deleteButton').addEventListener('click', function() {
    var userId = document.getElementById('userId').value;

    if (userId) {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'delete.php', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        xhr.onload = function() {
            if (this.status == 200) {
                alert('User deleted successfully');
                loadUserList();
                clearFormFields();
            } else {
                alert('An error occurred');
            }
        };

        xhr.send('id=' + userId);
    }
});

function loadUserList() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'users.php', true);

    xhr.onload = function() {
        if (this.status == 200) {
            var users = JSON.parse(this.responseText);
            var output = '';

            for (var i in users) {
                output += '<tr>' +
                    '<td>' + users[i].id + '</td>' +
                    '<td>' + users[i].fullname + '</td>' +
                    '<td>' + users[i].username + '</td>' +
                    '<td>' + users[i].email + '</td>' +
                    '</tr>';
            }

            document.getElementById('userTable').getElementsByTagName('tbody')[0].innerHTML = output;
        }
    };

    xhr.send();
}

loadUserList();

document.getElementById('userTable').getElementsByTagName('tbody')[0].addEventListener('click', function(event) {
    var cells = event.target.parentNode.getElementsByTagName('td');

    document.getElementById('userId').value = cells[0].innerText;
    document.getElementById('fullname').value = cells[1].innerText;
    document.getElementById('username').value = cells[2].innerText;
    document.getElementById('email').value = cells[3].innerText;
});

function clearFormFields() {
    document.getElementById('userId').value = '';
    document.getElementById('fullname').value = '';
    document.getElementById('username').value = '';
    document.getElementById('email').value = '';
    document.getElementById('password').value = '';
}
