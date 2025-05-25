const readline = require("readline");
const Process = require("./proceso.js");
const Planner = require("./planificador.js");
const Memory = require("./memoria.js");
const { parse } = require("path");

const memory = new Memory(50); // Total de memoria disponible
const planner = new Planner();
let pidCounter = 1; // Contador de PID

const rl = readline.createInterface({
  input: process.stdin, // Entrada estándar
  output: process.stdout, // Salida estándar
});

function showMenu() {
  rl.question("> ", (command) => {
    const [cmd, arg] = command.split(" ");
    switch (cmd) {
      case "run":
        const memRequired = Math.floor(Math.random() * 20) + 5; // Memoria requerida entre 5 y 25 MB
        if (memory.asignar(pidCounter, memRequired)) {
          // Asignar memoria al proceso
          const process = new Process(
            pidCounter,
            `P${pidCounter}`,
            memRequired,
            memory
          );
          planner.addProcess(process); // Agregar proceso al planificador
          console.log(
            `Proceso ${process.name} (PID: ${process.pID}) creado con ${memRequired}MB de memoria`
          );
          pidCounter++;
        } else {
          console.log(
            `No hay suficiente memoria disponible para el proceso ${pidCounter}`
          );
        }
        break;
      case "ps":
        planner.listProcesses(); // Listar procesos
        memory.mostrar(); // Mostrar estado de la memoria
        break;

      case "kill":
        const pid = parseInt(arg);

        // Buscar el proceso en la cola de planificación
        const processToKill = planner.cola.find((p) => p.pID === pid);

        if (processToKill) {
          //
          processToKill.finish(); // Marcar el proceso como terminado
          planner.cola = planner.cola.filter((p) => p.pID !== pid); // Eliminar el proceso de la cola
        } else {
          console.log(`Proceso con PID ${pid} no encontrado`);
        }
        break;

      case "exit":
        rl.close();
        return;

      case "schedule":
        planner.runRoundRobin();
        break;

      default:
        console.log("Comando no reconocido");
        break;
    }
    showMenu();
  });
}

showMenu();
