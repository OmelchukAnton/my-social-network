export type FieldValidatorType = (value: string) => string | undefined

export const required: FieldValidatorType = (value) => {
    if(value) {
        return undefined;
    } else {
        return 'Field is required';
    }
}

export const maxLengthCreator = (maxValue: number): FieldValidatorType => (value) => {
    if(value && value.length > maxValue) return `Max length is ${maxValue} symbols`;
    return undefined;
}