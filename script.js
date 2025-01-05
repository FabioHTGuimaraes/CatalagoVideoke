// Função de pesquisa da página
function filterTable() {
    const searchInput = document.getElementById('search');
    const filter = searchInput.value.toLowerCase();
    const tableRows = document.querySelectorAll('.musicList tbody tr');

    tableRows.forEach(row => {
        const rowText = row.textContent.toLowerCase();
        if (rowText.includes(filter)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

// Função para redirecionar para o instagram
function redirecionarParaPagina1() {
    // Redireciona para outra página
    window.open("https://www.linkedin.com/in/fabioguimaraes1/", "_blank");
}