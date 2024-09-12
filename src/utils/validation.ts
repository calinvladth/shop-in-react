function checkText(data: string): boolean {
    let isError = false

    if (!data) {
        isError = true
    }

    return isError
}

function checkStringRequiredLength(data: string, length: number): boolean {
    let isError = false

    if (data.length < length) {
        isError = true
    }

    return isError
}

function checkErrors(obj: unknown): boolean {
    let isError = false;

    for (const [key, value] of Object.entries(obj)) {
        if (value) {
            isError = true
            break
        }
    }

    return isError
}

export const validation = {
    checkText,
    checkStringRequiredLength,
    checkErrors,
}