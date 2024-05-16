document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const contratoId = urlParams.get('id');
    const entidadeNipc = urlParams.get('nipc');

    if (window.location.pathname === '/') {
        fetch('http://localhost:16000/contratos')
            .then(response => response.json())
            .then(data => populateContratosTable(data))
            .catch(error => console.error('Error:', error));
    } else if (window.location.pathname.includes('/contrato.html')) {
        fetch(`http://localhost:16000/contratos/${contratoId}`)
            .then(response => response.json())
            .then(data => populateContratoDetails(data))
            .catch(error => console.error('Error:', error));
    } else if (window.location.pathname.includes('/entidade.html')) {
        fetch(`http://localhost:16000/contratos?entidade=${entidadeNipc}`)
            .then(response => response.json())
            .then(data => populateEntidadeDetails(data, entidadeNipc))
            .catch(error => console.error('Error:', error));
    }
});

function populateContratosTable(contratos) {
    const tbody = document.querySelector('#contratos-table tbody');
    contratos.forEach(contrato => {
        const tr = document.createElement('tr');

        tr.innerHTML = `
            <td><a href="/contrato.html?id=${contrato.idcontrato}">${contrato.idcontrato}</a></td>
            <td>${contrato.objectoContrato}</td>
            <td>${contrato.dataCelebracaoContrato}</td>
            <td>${contrato.precoContratual}</td>
            <td><a href="/entidade.html?nipc=${contrato.NIPC_entidade_comunicante}">${contrato.NIPC_entidade_comunicante}</a></td>
            <td>${contrato.entidade_comunicante}</td>
        `;

        tbody.appendChild(tr);
    });
}

function populateContratoDetails(contrato) {
    const detailsDiv = document.getElementById('contrato-details');

    detailsDiv.innerHTML = `
        <p><strong>ID Contrato:</strong> ${contrato.idcontrato}</p>
        <p><strong>Número Anúncio:</strong> ${contrato.nAnuncio}</p>
        <p><strong>Tipo de Procedimento:</strong> ${contrato.tipoprocedimento}</p>
        <p><strong>Objeto do Contrato:</strong> ${contrato.objectoContrato}</p>
        <p><strong>Data de Publicação:</strong> ${contrato.dataPublicacao}</p>
        <p><strong>Data de Celebração:</strong> ${contrato.dataCelebracaoContrato}</p>
        <p><strong>Preço Contratual:</strong> ${contrato.precoContratual}</p>
        <p><strong>Prazo de Execução:</strong> ${contrato.prazoExecucao}</p>
        <p><strong>NIPC da Entidade Comunicante:</strong> <a href="/entidade.html?nipc=${contrato.NIPC_entidade_comunicante}">${contrato.NIPC_entidade_comunicante}</a></p>
        <p><strong>Entidade Comunicante:</strong> ${contrato.entidade_comunicante}</p>
        <p><strong>Fundamentação:</strong> ${contrato.fundamentacao}</p>
    `;
}

function populateEntidadeDetails(contratos, nipc) {
    const detailsDiv = document.getElementById('entidade-details');
    const totalContratos = contratos.reduce((sum, contrato) => sum + parseFloat(contrato.precoContratual), 0);

    detailsDiv.innerHTML = `
        <p><strong>NIPC:</strong> ${nipc}</p>
        <p><strong>Nome da Entidade:</strong> ${contratos[0].entidade_comunicante}</p>
        <p><strong>Total dos Contratos:</strong> ${totalContratos.toFixed(2)}</p>
        <h2>Contratos</h2>
        <table id="entidade-contratos-table">
            <thead>
                <tr>
                    <th>ID Contrato</th>
                    <th>Objeto do Contrato</th>
                    <th>Data de Celebração</th>
                    <th>Preço Contratual</th>
                    <th>Entidade Comunicante</th>
                </tr>
            </thead>
            <tbody>
                ${contratos.map(contrato => `
                    <tr>
                        <td><a href="/contrato.html?id=${contrato.idcontrato}">${contrato.idcontrato}</a></td>
                        <td>${contrato.objectoContrato}</td>
                        <td>${contrato.dataCelebracaoContrato}</td>
                        <td>${contrato.precoContratual}</td>
                        <td>${contrato.entidade_comunicante}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}