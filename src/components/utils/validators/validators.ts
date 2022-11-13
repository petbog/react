
export type FieldValudatorType = (value: string) => string | undefined

export const required: FieldValudatorType = (value) => {
    if (value) {
        return undefined;
    } else {
        return 'Field is required';
    }
};


export const maxLengthCreator = (maxLength:number): FieldValudatorType => {
    return (value) => {
        if (value.length > maxLength) {
            return `Max length is ${maxLength} symbols`
        } else {
            return undefined;
        }
    }
}
