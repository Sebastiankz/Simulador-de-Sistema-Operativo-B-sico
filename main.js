/**
 * Simulador de Sistema Operativo Básico
 * 
 * Este archivo implementa la interfaz principal del simulador de sistema operativo.
 * Proporciona una línea de comandos para interactuar con el sistema,
 * permitiendo la creación de procesos, visualización de su estado,
 * terminación de procesos y ejecución del planificador.
 */

// Importación de módulos necesarios
const readline = require("readline");      // Módulo para crear interfaz de línea de comandos
const Process = require("./proceso.js");   // Clase que representa un proceso en el sistema
const Planner = require("./planificador.js"); // Planificador de procesos del sistema
const Memory = require("./memoria.js");    // Gestor de memoria del sistema
const { parse } = require("path");         // Utilidad para parseo de rutas (no utilizada)

// Inicialización de los componentes principales del sistema
const memory = new Memory(50);             // Inicializa el sistema de memoria con 50MB totales
const planner = new Planner();             // Inicializa el planificador de procesos
let pidCounter = 1;                        // Contador para asignar IDs únicos a los procesos

// Configuración de la interfaz de línea de comandos
const rl = readline.createInterface({
  input: process.stdin,                    // Utiliza la entrada estándar (teclado)
  output: process.stdout,                  // Utiliza la salida estándar (consola)
});

/**
 * Función principal que muestra el menú de comandos y procesa las entradas del usuario.
 * Implementa un patrón recursivo para mantener la interfaz activa.
 */
function showMenu() {
  rl.question("> ", (command) => {         // Muestra prompt y espera comando del usuario
    const [cmd, arg] = command.split(" "); // Divide la entrada en comando y argumento
    
    // Procesamiento de comandos mediante estructura switch
    switch (cmd) {
      case "run":
        // Comando para crear y ejecutar un nuevo proceso
        
        // Genera requerimiento aleatorio de memoria entre 5 y 25 MB
        const memRequired = Math.floor(Math.random() * 20) + 5;
        
        // Intenta asignar memoria para el nuevo proceso
        if (memory.asignar(pidCounter, memRequired)) {
          // Si hay suficiente memoria disponible, crea un nuevo proceso
          const process = new Process(
            pidCounter,                    // ID del proceso
            `P${pidCounter}`,              // Nombre del proceso (P + número ID)
            memRequired,                   // Cantidad de memoria requerida
            memory                         // Referencia al gestor de memoria
          );
          
          planner.addProcess(process);     // Añade el proceso al planificador
          
          // Informa al usuario sobre la creación exitosa del proceso
          console.log(
            `Proceso ${process.name} (PID: ${process.pID}) creado con ${memRequired}MB de memoria`
          );
          
          pidCounter++;                    // Incrementa el contador de PID para el siguiente proceso
        } else {
          // Si no hay suficiente memoria, informa al usuario
          console.log(
            `No hay suficiente memoria disponible para el proceso ${pidCounter}`
          );
        }
        break;
        
      case "ps":
        // Comando para mostrar el estado actual del sistema
        planner.listProcesses();           // Muestra la lista de procesos activos
        memory.mostrar();                  // Muestra el estado actual de la memoria
        break;

      case "kill":
        // Comando para terminar un proceso específico
        const pid = parseInt(arg);         // Convierte el argumento a un número entero

        // Busca el proceso con el PID especificado en la cola del planificador
        const processToKill = planner.cola.find((p) => p.pID === pid);

        if (processToKill) {
          // Si el proceso existe, lo termina
          processToKill.finish();          // Marca el proceso como terminado (libera su memoria)
          
          // Elimina el proceso de la cola del planificador
          planner.cola = planner.cola.filter((p) => p.pID !== pid);
        } else {
          // Si el proceso no existe, informa al usuario
          console.log(`Proceso con PID ${pid} no encontrado`);
        }
        break;

      case "exit":
        // Comando para salir del simulador
        rl.close();                        // Cierra la interfaz de línea de comandos
        return;                            // Sale de la función showMenu para terminar el programa

      case "schedule":
        // Comando para ejecutar el algoritmo de planificación
        planner.runRoundRobin();           // Ejecuta el algoritmo Round Robin
        break;

      default:
        // Manejo de comandos no reconocidos
        console.log("Comando no reconocido");
        break;
    }
    
    // Llamada recursiva para mantener el menú activo
    showMenu();
  });
}

// Iniciar el simulador mostrando el menú de comandos
showMenu();
