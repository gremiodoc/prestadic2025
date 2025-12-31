
let data = [];

fetch('prestaciones.json')
.then(res => res.json())
.then(json => data = json);

function limpiarCedula(valor) {
    return String(valor)
        .replace(/[^0-9]/g, '')
        .trim();
}

function consultar() {
    const cedulaInput = document.getElementById('cedula').value;
    const cedula = limpiarCedula(cedulaInput);
    const res = document.getElementById('resultado');

    if (cedula.length < 6) {
        res.innerHTML = '<p style="color:orange;">Ingrese una cédula válida</p>';
        return;
    }

    const persona = data.find(p => 
        limpiarCedula(p.CEDULA) === cedula
    );

    if (persona) {
        res.innerHTML = `
        <p><strong>${persona.NOMBRES} ${persona.APELLIDOS}</strong><br>
        Estado: ${persona.ESTADO}</p>
        <p style="color:lightgreen;">
        Felicitaciones, usted cobrará Prestaciones Sociales
        </p>`;
    } else {
        res.innerHTML = `
        <p style="color:yellow;">
        Lamentablemente, usted NO cobrará Prestaciones Sociales
        </p>`;
    }
}

function reiniciar() {
    document.getElementById('cedula').value = '';
    document.getElementById('resultado').innerHTML = '';
}
