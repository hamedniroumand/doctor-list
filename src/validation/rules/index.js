export const required = (payload) => {
    const required = (value) => {
        let isValid;
        if (Array.isArray(value)) {
            isValid = value.length > 0;
        } else {
            isValid = value || (typeof value === 'string' && !!value.trim().length);
        }
        return { isValid, payload }
    }
    return required;
}

export const english = (payload) => {
    const english = (value) => {
        const isValid = /^[A-Za-z][A-Za-z]*$/.test(value);
        return { isValid, payload }
    }
    return english;
}

export const email = (payload) => {
    const email = (value) => {
        const isValid = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value);
        return { isValid, payload }
    }
    return email;
}

export const min = (minValue) => {
    const min = (value) => {
        const isValid = String(value).length >= minValue;
        return { isValid, payload: minValue }
    }
    return min;
}

export const array = (payload) => {
    const array = (value) => {
        const isValid = Array.isArray(value);
        return { isValid, payload: payload }
    }
    return array;
}