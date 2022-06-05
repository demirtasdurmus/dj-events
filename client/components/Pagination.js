import Link from 'next/link'

export default function Pagination({ page }) {
    return (
        <>
            {page > 1 && (
                <Link href={`/events?page=${page - 1}`}>
                    <a className='btn-secondary'>Prev</a>
                </Link>
            )}
            <Link href={`/events?page=${page + 1}`}>
                <a className='btn-secondary'>Next</a>
            </Link>
        </>
    )
}