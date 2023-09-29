document.addEventListener('input', updatePercentages);

function updatePercentages() {
  const weights = [];
  let totalWeight = 0;
  for (let i = 1; i <= 4; i++) {
    const cellValue = document.getElementById(`cell-1-${i}`).innerText.trim();
    const weight = parseInt(cellValue) || 0;
    weights.push(weight);
    totalWeight += weight;
  }
  const percentages = weights.map(weight => ((weight / totalWeight) * 100).toFixed(2) + '%');
  for (let i = 0; i < percentages.length; i++) {
    document.getElementById(`percentage-${i + 1}`).innerText = `Porcentaje de Alumnos ${getWeightRange(i)}: ${percentages[i]}`;
  }
}

function getWeightRange(index) {
  switch (index) {
    case 0:
      return '< 40 Kg';
    case 1:
      return '40-50 Kg';
    case 2:
      return '50-60 Kg';
    case 3:
      return '>= 60 Kg';
    default:
      return '';
  }
}
