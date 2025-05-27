/**
 * Clase Planner
 * 
 * Implementa un planificador de procesos básico para el simulador de sistema operativo.
 * Utiliza el algoritmo Round Robin para gestionar la ejecución de procesos en la CPU,
 * manteniendo una cola de procesos listos para ejecutar.
 */
class Planner {
  /**
   * Constructor de la clase Planner
   * 
   * Inicializa una cola vacía para almacenar los procesos a planificar.
   */
  constructor() {
    this.cola = [];      // Cola de procesos listos para ejecutar
  }

  /**
   * Añade un nuevo proceso a la cola de planificación
   * 
   * @param {Process} process - Instancia del proceso a añadir a la cola
   */
  addProcess(process) {
    this.cola.push(process);   // Agregar el proceso al final de la cola
  }

  /**
   * Ejecuta un ciclo del algoritmo de planificación Round Robin
   * 
   * Este método:
   * 1. Elimina procesos terminados del inicio de la cola
   * 2. Toma el primer proceso de la cola y lo ejecuta
   * 3. Simula aleatoriamente si el proceso ha terminado
   * 4. Si el proceso no ha terminado, lo coloca al final de la cola
   */
  runRoundRobin() {
    // Eliminar procesos terminados que estén al inicio de la cola
    while (this.cola.length && this.cola[0].state === "terminado") {
      this.cola.shift();   // Eliminar procesos terminados de la cola
    }

    // Verificar si hay procesos disponibles para ejecutar
    if (this.cola.length === 0) {
      console.log("No hay procesos en la cola");
      return;
    }

    // Obtener el primer proceso de la cola (siguiendo el principio FIFO)
    const process = this.cola.shift();
    
    // Ejecutar el proceso durante su quantum de tiempo
    process.ejecutar();

    // Simular aleatoriamente si el proceso ha terminado su ejecución completa
    const finishedProcess = Math.random() < 0.5;
    
    if (finishedProcess) {
      process.finish();        // Marcar el proceso como terminado
    } else {
      this.cola.push(process); // Reagregar el proceso al final de la cola para su próxima ejecución
    }
  }

  /**
   * Muestra la lista de todos los procesos actuales en la cola
   * 
   * Imprime en consola el PID, nombre y estado de cada proceso.
   */
  listProcesses() {
    console.log("Lista de procesos:");
    this.cola.forEach((process) => {
      console.log(
        `PID: ${process.pID}, Nombre: ${process.name}, Estado: ${process.state}`
      );
    });
  }
}

// Exporta la clase Planner para que pueda ser utilizada en otros módulos
module.exports = Planner;