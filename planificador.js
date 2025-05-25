class Planner {
  constructor() {
    this.cola = [];
  }
  addProcess(process) {
    this.cola.push(process); // Agregar el proceso a la cola
  }
  runRoundRobin() {
    while (this.cola.length && this.cola[0].state === "terminado") {
      this.cola.shift(); // Eliminar procesos terminados de la cola
    }

    if (this.cola.length === 0) {
      console.log("No hay procesos en la cola");
      return;
    }

    const process = this.cola.shift(); // Obtener el primer proceso de la cola
    process.ejecutar(); // Ejecutar el proceso

    const finishedProcess = Math.random() < 0.5; // Simular si el proceso ha terminado
    if (finishedProcess) {
      process.finish(); // Marcar el proceso como terminado
    } else {
      this.cola.push(process); // Reagregar el proceso al final de la cola
    }
  }
  listProcesses() {
    console.log("Lista de procesos:");
    this.cola.forEach((process) => {
      console.log(
        `PID: ${process.pID}, Nombre: ${process.name}, Estado: ${process.state}`
      );
    });
  }
}
module.exports = Planner;
