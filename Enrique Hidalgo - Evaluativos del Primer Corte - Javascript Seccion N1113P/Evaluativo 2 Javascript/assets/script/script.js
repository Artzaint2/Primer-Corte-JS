function calcularInteres() {
    const montoInicial = parseFloat(document.getElementById('montoInicial').value);
    const ingresoMensual = parseFloat(document.getElementById('ingresoMensual').value);
    const tasaMensual = 0.0125;
  
    let saldoAcumulado = montoInicial;
    let totalInteres = 0;
  
    for (let mes = 1; mes <= 12; mes++) {
      const interesMensual = saldoAcumulado * tasaMensual;
      totalInteres += interesMensual;
  
      saldoAcumulado = saldoAcumulado + ingresoMensual + interesMensual;
    }
  
    const saldoFinal = saldoAcumulado;
    const interesTotal = totalInteres;
    const resultadoHTML = `
      <h4>Resultado:</h4>
      <p>Saldo al final del año: ${saldoFinal.toFixed(2)} Bs.</p>
      <p>Interés total generado: ${interesTotal.toFixed(2)} Bs.</p>
    `;
  
    document.getElementById('resultado').innerHTML = resultadoHTML;
  }
  