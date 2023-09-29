function crearTabla() {
    const numAlumnos = parseInt(document.getElementById('numAlumnos').value);
  
    if (isNaN(numAlumnos) || numAlumnos <= 0) {
      alert('Por favor, ingrese un número válido de alumnos.');
      return;
    }
  
    let tablaHtml = `
      <table id="tablaAlumnos" class="table">
        <thead>
          <tr>
            <th>Cédula</th>
            <th>Nombre</th>
            <th>Matemáticas</th>
            <th>Física</th>
            <th>Programación</th>
          </tr>
        </thead>
        <tbody>
    `;
  
    for (let i = 0; i < numAlumnos; i++) {
      tablaHtml += `
        <tr>
          <td><input type="text" id="cedula-${i}" class="form-control"></td>
          <td><input type="text" id="nombre-${i}" class="form-control"></td>
          <td><input type="number" id="matematicas-${i}" class="form-control" min="0" max="20"></td>
          <td><input type="number" id="fisica-${i}" class="form-control" min="0" max="20"></td>
          <td><input type="number" id="programacion-${i}" class="form-control" min="0" max="20"></td>
        </tr>
      `;
    }
  
    tablaHtml += `
        </tbody>
      </table>
    `;
  
    document.getElementById('tabla-container').innerHTML = tablaHtml;
  }
  
  function obtenerDatosTabla() {
    const numAlumnos = parseInt(document.getElementById('numAlumnos').value);
  
    const alumnos = [];
  
    for (let i = 0; i < numAlumnos; i++) {
      const cedula = document.getElementById(`cedula-${i}`).value;
      const nombre = document.getElementById(`nombre-${i}`).value;
      const matematicas = parseFloat(document.getElementById(`matematicas-${i}`).value);
      const fisica = parseFloat(document.getElementById(`fisica-${i}`).value);
      const programacion = parseFloat(document.getElementById(`programacion-${i}`).value);
  
      alumnos.push({
        cedula,
        nombre,
        matematicas,
        fisica,
        programacion
      });
    }
  
    return alumnos;
  }
  
  function actualizarTabla() {
    const alumnos = obtenerDatosTabla();
    const tabla = document.getElementById('tablaAlumnos');
  
    for (let i = 0; i < alumnos.length; i++) {
      const row = tabla.rows[i + 1];
      row.cells[0].getElementsByTagName('input')[0].value = alumnos[i].cedula;
      row.cells[1].getElementsByTagName('input')[0].value = alumnos[i].nombre;
      row.cells[2].getElementsByTagName('input')[0].value = alumnos[i].matematicas;
      row.cells[3].getElementsByTagName('input')[0].value = alumnos[i].fisica;
      row.cells[4].getElementsByTagName('input')[0].value = alumnos[i].programacion;
    }
  }
  
  function calcularEstadisticas() {
    actualizarTabla();
  
    const alumnos = obtenerDatosTabla();
    const numAlumnos = alumnos.length;
  
    let sumaMatematicas = 0;
    let sumaFisica = 0;
    let sumaProgramacion = 0;
    let aprobadosMatematicas = 0;
    let aprobadosFisica = 0;
    let aprobadosProgramacion = 0;
    let aprobadosTodas = 0;
    let aprobadosUna = 0;
    let aprobadosDos = 0;
    let maxNotaMatematicas = 0;
    let maxNotaFisica = 0;
    let maxNotaProgramacion = 0;
  
    for (let i = 0; i < numAlumnos; i++) {
      const notaMatematicas = alumnos[i].matematicas;
      const notaFisica = alumnos[i].fisica;
      const notaProgramacion = alumnos[i].programacion;
  
      sumaMatematicas += notaMatematicas;
      sumaFisica += notaFisica;
      sumaProgramacion += notaProgramacion;
  
      if (notaMatematicas >= 10) aprobadosMatematicas++;
      if (notaFisica >= 10) aprobadosFisica++;
      if (notaProgramacion >= 10) aprobadosProgramacion++;
      if (notaMatematicas >= 10 && notaFisica >= 10 && notaProgramacion >= 10) aprobadosTodas++;
      if ((notaMatematicas >= 10 && notaFisica < 10 && notaProgramacion < 10) ||
          (notaMatematicas < 10 && notaFisica >= 10 && notaProgramacion < 10) ||
          (notaMatematicas < 10 && notaFisica < 10 && notaProgramacion >= 10)) {
        aprobadosUna++;
      }
      if ((notaMatematicas >= 10 && notaFisica >= 10 && notaProgramacion < 10) ||
          (notaMatematicas >= 10 && notaFisica < 10 && notaProgramacion >= 10) ||
          (notaMatematicas < 10 && notaFisica >= 10 && notaProgramacion >= 10)) {
        aprobadosDos++;
      }
  
      maxNotaMatematicas = Math.max(maxNotaMatematicas, notaMatematicas);
      maxNotaFisica = Math.max(maxNotaFisica, notaFisica);
      maxNotaProgramacion = Math.max(maxNotaProgramacion, notaProgramacion);
    }
  
    const promedioMatematicas = sumaMatematicas / numAlumnos;
    const promedioFisica = sumaFisica / numAlumnos;
    const promedioProgramacion = sumaProgramacion / numAlumnos;
    const resultadosDiv = document.getElementById('resultados');
    resultadosDiv.innerHTML = `
      <h3>Resultados:</h3>
      <p>Promedio Matemáticas: ${promedioMatematicas.toFixed(2)}</p>
      <p>Promedio Física: ${promedioFisica.toFixed(2)}</p>
      <p>Promedio Programación: ${promedioProgramacion.toFixed(2)}</p>
      <p>Número de alumnos aprobados en Matemáticas: ${aprobadosMatematicas}</p>
      <p>Número de alumnos aprobados en Física: ${aprobadosFisica}</p>
      <p>Número de alumnos aprobados en Programación: ${aprobadosProgramacion}</p>
      <p>Número de alumnos que aprobaron todas las materias: ${aprobadosTodas}</p>
      <p>Número de alumnos que aprobaron una sola materia: ${aprobadosUna}</p>
      <p>Número de alumnos que aprobaron dos materias: ${aprobadosDos}</p>
      <p>Nota máxima en Matemáticas: ${maxNotaMatematicas}</p>
      <p>Nota máxima en Física: ${maxNotaFisica}</p>
      <p>Nota máxima en Programación: ${maxNotaProgramacion}</p>
    `;
  }
  