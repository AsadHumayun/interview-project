export function classNames(...classes: unknown[]): string {
    return classes.filter(Boolean).join(' ')
}

/**
 * Calculates percentage from an initial number (`n`) and total (`t`)
 * @returns {number} Percentage
 */
export function getPercentage(n: number, t: number): number {
    return (n / t) * 100;
}
