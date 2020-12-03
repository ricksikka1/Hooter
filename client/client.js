
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
        form.style.display = '';
        loadingElement.style.display = '';
        listAllHoots();    
      });
    
});

function listAllHoots(){
    hootsElement.innerHTML='';
    fetch(API_URL)
        .then(response => response.json())
        .then(hoots => {
            hoots.reverse();
            console.log(hoots);
            hoots.forEach(hoot => {
                const div = document.createElement('div');

                const header = document.createElement('h3');
                header.textContent = hoot.name + " the 🦉:";

                const contents = document.createElement('p');
                contents.textContent = hoot.content;

                var date = document.createElement('small');
                date.textContent = new Date(hoot.created).toLocaleString();
                                
                div.appendChild(header);
                div.appendChild(contents);
                div.appendChild(date);

                hootsElement.appendChild(div);
            });
        });
        loadingElement.style.display = 'none';
}