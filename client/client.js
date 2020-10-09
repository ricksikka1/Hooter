
const form = document.querySelector('form');
const loadingElement = document.querySelector('.loading');
const API_URL = 'http://localhost:5000/hoots';
const hootsElement = document.querySelector('.hoots');

loadingElement.style.display = '';

listAllHoots();


form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const name = formData.get('name');
    const content = formData.get('content');

    const hoot = {
        name,
        content
    };

    loadingElement.style.display = '';
    form.style.display = 'none';
    
    fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify(hoot),
        headers: {
            'content-type': 'application/json'
        }
    }).then(response => response.json())
      .then(createdHoot => {
        form.reset();
        loadingElement.style.display = 'none';
        form.style.display = '';
      });
    
});

function listAllHoots(){
    fetch(API_URL)
        .then(response => response.json())
        .then(hoots => {
            hoots.forEach(hoot => {
                const div = document.createElement('div');

                const header = document.createElement('h3');
                header.textContent = hoot.name;

                const content = document.createElement('p');
                content = hoot.content;

                div.appendChild(header);
                div.appendChild(content);

                hootsElement.appendChild(div);
            });
        })
}