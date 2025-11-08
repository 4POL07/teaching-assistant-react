export class Student {
  constructor(
    public name: string,
    public cpf: string,
    public email: string
  ) {
    this.validateCPF(cpf);
    this.validateEmail(email);
  }

  private validateCPF(cpf: string): void {
    // Basic CPF validation - remove dots and dashes, check length
    const cleanCPF = cpf.replace(/[.-]/g, '');
    if (cleanCPF.length !== 11 || !/^\d+$/.test(cleanCPF)) {
      throw new Error('Invalid CPF format');
    }
  }

  private validateEmail(email: string): void {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error('Invalid email format');
    }
  }

  // Format CPF for display (000.000.000-00)
  getFormattedCPF(): string {
    const cleanCPF = this.cpf.replace(/[.-]/g, '');
    return cleanCPF.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }

  // Get clean CPF for comparison
  getCleanCPF(): string {
    return this.cpf.replace(/[.-]/g, '');
  }

  // Convert to JSON for API responses
  toJSON() {
    return {
      name: this.name,
      cpf: this.getFormattedCPF(),
      email: this.email
    };
  }
}