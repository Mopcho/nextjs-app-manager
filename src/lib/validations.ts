const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
function containsUppercase(str: string) {
    return /[A-Z]/.test(str);
}

function hasNumber(str: string) {
    return /\d/.test(str);
}

export const validateFirstName = (value: string) => {
    if (value.length < 2) {
        return 'Firstname must be at least 2 charaters long';
    }
}

export const validateLastName = (value: string) => {
    if (value.length < 2) {
        return 'Lastname must be at least 2 charaters long';
    }
}

export const validateEmail = (value: string) => {
    if (!emailRegex.test(value)) {
        return 'Email seems to be invalid';
    }
}

export const validatePassword = (value: string) => {
    if (value.length < 8) {
        return 'Password must be at least 8 characters long'
    }

    if (!containsUppercase(value)) {
        return 'Password must contain at least one uppercase'
    }

    if (!hasNumber(value)) {
        return 'Password must contain at least one number'
    }
}

export const validateTaskName = (value: string) => {
    if (value.length < 6) {
        return 'Task name must be at least 6 characters';
    }
}

export const validateDescription = (value: string) => {
    if (value.length < 10) {
        return 'Task description must be at least 6 characters';
    }
}

export const validateStatus = (value: string) => {
    if (value !== 'NOT_STARTED' && value !== 'STARTED' && value !== 'COMPLETED') {
        return 'Task status must be NOT_STARTED or STARTED or COMPLETED';
    }
}