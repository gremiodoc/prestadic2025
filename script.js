let data = [];
let datosCargados = false;

document.addEventListener("DOMContentLoaded", () => {
    fetch('prestaciones.json', { cache: "no-store" })
        .then(res => {
            if (!res.ok) {
                throw new Error('No se pudo cargar prestaciones.json');
            }
            return res.json();
        })
        .then(json => {
            data = json;
            datosCargados = true;
            console.log("Base de datos cargada:", data.length, "registros");
        })
        .catch(err => {
            console.error(err);
            document.getElementById('resultado').innerHTML =
                '<p style="color:red;">Error cargando la base de datos</p>';
        });
});

function limpiarCedula(valor) {
    return String(valor)
        .replace(/[^0-9]/g, '')
        .trim();
}

function consultar() {
    const res = document.getElementById('resultado');

    if (!datosCargados) {
        res.innerHTML =
            '<p style="color:orange;">La base de datos aún se está cargando, intente nuevamente.</p>';
        return;
    }

    const cedulaInput = document.getElementById('cedula').value;
    const cedula = limpiarCedula(cedulaInput);

    if (cedula.length < 6) {
        res.innerHTML =
            '<p style="color:orange;">Ingrese una cédula válida</p>';
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
