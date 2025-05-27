/**
 * Clase Process
 * 
 * Representa un proceso en el simulador de sistema operativo.
 * Cada proceso tiene un identificador único (PID), un nombre, requiere
 * una cantidad específica de memoria y mantiene un estado durante su ciclo de vida.
 */
class Process {
  /**
   * Constructor de la clase Process
   * 
   * @param {number} pID - Identificador único del proceso
   * @param {string} name - Nombre descriptivo del proceso
   * @param {number} requireMemory - Cantidad de memoria requerida (en MB)
   * @param {Memory} memoryManager - Referencia al gestor de memoria del sistema
   */
  constructor(pID, name, requireMemory, memoryManager) {
    this.pID = pID;
    this.name = name;
    this.requireMemory = requireMemory;
    this.memoryManager = memoryManager; // Instancia de memoria
    this.state = "activo"; // Estado inicial del proceso
  }

  /**
   * Simula la ejecución del proceso durante un quantum de tiempo
   * 
   * Imprime en consola información sobre el proceso que se está ejecutando.
   */
  ejecutar() {
    console.log(`Ejecutando proceso ${this.name} (PID: ${this.pID})`);
  }

  /**
   * Finaliza la ejecución del proceso y libera sus recursos
   * 
   * @param {Memory} memory - Parámetro no utilizado (la instancia de memoria ya está guardada en this.memoryManager)
   */
  finish(memory) {
    if (this.state !== "terminado") {
      this.state = "terminado";
      this.memoryManager.liberar(this.pID); // Usa la instancia global de memoria
      console.log(`Proceso ${this.name} (PID: ${this.pID}) ha terminado`);
    }
  }
}

module.exports = Process;