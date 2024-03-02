import QRCard from '@/components/QR/QRCard'

const dummyUser = {
    name: 'John Doe',
    color: 'coral',
    revTag: '1234',
    id: '1234',
}

export default function page() {
    return (
        <>
            <QRCard title={'beer'} id={'fdsa'} userTo={dummyUser} amount={400} />
            <QRCard title={'sajt'} id={'23'} userTo={dummyUser} amount={1200} />
        </>
    )
}
