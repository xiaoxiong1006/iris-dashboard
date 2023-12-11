document.getElementById('loadButton').addEventListener('click', function() {
            fetch('/hello')
                .then(response => response.text())
                .then(data => {
                    document.getElementById('message').innerHTML = data;
                })
                .catch(error => console.error('Error:', error));
        });