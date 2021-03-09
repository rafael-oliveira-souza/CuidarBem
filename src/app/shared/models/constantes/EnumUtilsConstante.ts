export const EnumUtilsConstants = {
  getNameByValue<T>(value: any, enumm: T): string {
    const valores: any[] = Object.values(enumm);
    const chaves: string[] = Object.keys(enumm);
    let nome: string = null;

    valores.forEach((valor, index) => {
      if (value == valor) {
        nome = chaves[index];
      }
    });

    return nome;
  },
};
