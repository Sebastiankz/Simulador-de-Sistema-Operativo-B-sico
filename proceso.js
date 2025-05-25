class Process {
  constructor(pID, name, requireMemory, memoryManager) {
    this.pID = pID;
    this.name = name;
    this.requireMemory = requireMemory;
    this.memoryManager = memoryManager; // Instancia de memoria
    this.state = "activo"; // Estado inicial del proceso
  }

  ejecutar() {
    console.log(`Ejecutando proceso ${this.name} (PID: ${this.pID})`);
  }

  finish(memory) {
    if (this.state !== "terminado") {
      this.state = "terminado";
      this.memoryManager.liberar(this.pID); // Usa la instancia global de memoria
      console.log(`Proceso ${this.name} (PID: ${this.pID}) ha terminado`);
    }
  }
}

module.exports = Process;
