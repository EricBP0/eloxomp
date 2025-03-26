export function toMoney(value: number | string): string {
    const number = typeof value === 'string' ? parseFloat(value) : value;

    if (isNaN(number)) return "0,00";

    return number.toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
}