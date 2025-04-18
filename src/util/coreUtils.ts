export function normalizedChampionName(name: string): string {
    const firstLether: string = name.substring(0, 1).toUpperCase()
    name = name.substring(1)
    name = firstLether + name
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-zA-Z0-9]/g, "")
        .replace("'", "")
        .toLowerCase()
    return name
}
