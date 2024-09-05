document.addEventListener('DOMContentLoaded', function () {
    const ctx = document.getElementById('alunosChart').getContext('2d');
    const manhaData = {
        labels: ['UFCG', 'FAFIC', 'IFPB', 'UNIFSM', 'ECIT', 'Outros', 'Preto', 'Romildo'],
        datasets: [{
            data: [20, 6, 12, 10, 5, 7, 18, 12],
            backgroundColor: ['#ff6384', '#36a2eb', '#ffcd56', '#4bc0c0', '#9966ff', '#c9cbcf', '#ff9f40', '#8a2be2']
        }]
    };
    const noiteData = {
        labels: ['UFCG', 'FAFIC', 'IFPB', 'UNIFSM', 'ECIT', 'Outros', 'Preto', 'Romildo'],
        datasets: [{
            data: [15, 8, 10, 12, 4, 6, 14, 14],
            backgroundColor: ['#ff6384', '#36a2eb', '#ffcd56', '#4bc0c0', '#9966ff', '#c9cbcf', '#ff9f40', '#8a2be2']
        }]
    };
    let currentData = manhaData;
    const alunosChart = new Chart(ctx, {
        type: 'pie',
        data: currentData,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        label: function (tooltipItem) {
                            return tooltipItem.label + ': ' + tooltipItem.raw + ' alunos';
                        }
                    }
                }
            },
        }
    });
    document.getElementById('toggleButton').addEventListener('click', function () {
        currentData = currentData === manhaData ? noiteData : manhaData;
        this.textContent = currentData === manhaData ? 'Trocar para Gráfico Noturno' : 'Trocar para Gráfico Matutino';
        alunosChart.data = currentData;
        alunosChart.update();
    });
});
