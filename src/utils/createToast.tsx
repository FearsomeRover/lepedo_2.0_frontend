import toast from 'react-hot-toast'

export function createToast(text: string, success?: boolean, icon?: string) {
    if (success === true) {
        toast.success((t) => <span onClick={() => toast.dismiss(t.id)}>{text}</span>)
    } else if (success === false) {
        toast.error((t) => <span onClick={() => toast.dismiss(t.id)}>{text}</span>)
    } else if (icon) {
        toast(text, {
            icon: icon,
        })
    } else {
        toast(text)
    }
}
