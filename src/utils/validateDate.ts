export const validateDate = (event: any) => {
    if (new Date(event.target.value) > new Date()) {
        ;(event.target as HTMLInputElement).setCustomValidity('Really bro?')
    }
}
