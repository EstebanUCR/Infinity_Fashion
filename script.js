function loadPage(page) {
    const contentDiv = document.getElementById('main-content');
    fetch(`${page}.html`)
        .then(response => {
            if (response.ok) {
                return response.text();
            } else {
                throw new Error('Error al cargar la página');
            }
        })
        .then(html => {
            contentDiv.innerHTML = html;
        })
        .catch(error => {
            contentDiv.innerHTML = `<p>${error.message}</p>`;
        });
}



// Cargar página de inicio por defecto
window.onload = function() {
    loadPage('home');
};
