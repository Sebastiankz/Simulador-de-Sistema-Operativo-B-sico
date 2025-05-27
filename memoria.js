/**
 * Clase Memory
 * 
 * Implementa un gestor de memoria simple para el simulador de sistema operativo.
 * Se encarga de llevar registro de la memoria total del sistema, la memoria disponible
 * y las asignaciones de memoria a cada proceso mediante su identificador (PID).
 */
class Memory {
  /**
   * Constructor de la clase Memory
   * 
   * @param {number} total - Cantidad total de memoria del sistema (en MB)
   */
  constructor(total) {
    this.total = total,                  // Memoria total del sistema
    this.disponible = total,             // Memoria disponible inicialmente (igual a la total)
    this.asignations = new Map();        // Mapa para registrar asignaciones de memoria (PID -> cantidad)
  }

  /**
   * Asigna una cantidad de memoria a un proceso específico
   * 
   * @param {number} pID - Identificador del proceso al que asignar memoria
   * @param {number} requireMemory - Cantidad de memoria requerida (en MB)
   * @returns {boolean} - true si la asignación fue exitosa, false si no hay memoria suficiente
   */
  asignar(pID, requireMemory) {
    // Verifica si hay suficiente memoria disponible para asignar
    if (this.disponible >= requireMemory) {
      this.disponible -= requireMemory;           // Reduce la memoria disponible
      this.asignations.set(pID, requireMemory);   // Registra la asignación en el mapa
      return true;                                // Indica asignación exitosa
    }
    return false;                                 // No hay suficiente memoria disponible
  }

  /**
   * Libera la memoria asignada a un proceso
   * 
   * @param {number} pID - Identificador del proceso cuya memoria se liberará
   * @returns {boolean} - true si la liberación fue exitosa, false si el PID no fue encontrado
   */
  liberar(pID) {
    // Verifica si el PID tiene memoria asignada
    if (this.asignations.has(pID)) {
      const requireMemory = this.asignations.get(pID);  // Obtiene la cantidad de memoria asignada
      this.disponible += requireMemory;                 // Aumenta la memoria disponible
      this.asignations.delete(pID);                     // Elimina la asignación del mapa
      return true;                                      // Indica liberación exitosa
    }
    return false;                                       // El PID no tiene memoria asignada
  }

  /**
   * Muestra el estado actual de la memoria del sistema
   * 
   * Imprime en consola la memoria total, disponible y
   * todas las asignaciones de memoria a procesos activos.
   */
  mostrar() {
    console.log(`Memoria total: ${this.total}`);         // Muestra memoria total del sistema
    console.log(`Memoria disponible: ${this.disponible}`); // Muestra memoria disponible
    console.log("Asignaciones de memoria:");              // Encabezado para las asignaciones
    
    // Itera sobre el mapa de asignaciones y muestra cada una
    this.asignations.forEach((value, key) => {
      console.log(`PID: ${key}, Memoria asignada: ${value}`);
    });
  }
}

// Exporta la clase Memory para que pueda ser utilizada en otros módulos
module.exports = Memory;