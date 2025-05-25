class Memory {
  constructor(total) {
    (this.total = total),
      (this.disponible = total),
      (this.asignations = new Map());
  }

  asignar(pID, requireMemory) {
    // Asignar memoria a un proceso
    if (this.disponible >= requireMemory) {
      this.disponible -= requireMemory;
      this.asignations.set(pID, requireMemory);
      return true;
    }
    return false; // No hay suficiente memoria disponible
  }

  liberar(pID) {
    if (this.asignations.has(pID)) {
      // Liberar memoria de un proceso
      const requireMemory = this.asignations.get(pID);
      this.disponible += requireMemory;
      this.asignations.delete(pID);
      return true;
    }
    return false; // No se encontró el PID
  }

  mostrar() {
    // Mostrar estado de la memoria
    console.log(`Memoria total: ${this.total}`);
    console.log(`Memoria disponible: ${this.disponible}`);
    console.log("Asignaciones de memoria:");
    this.asignations.forEach((value, key) => {
      console.log(`PID: ${key}, Memoria asignada: ${value}`);
    });
  }
}

module.exports = Memory;
