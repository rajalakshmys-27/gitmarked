export function SunIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#FFFFFF" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
        </svg>
    )
}

export function MoonIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
        </svg>
    )
}

export function ChevronDownIcon({ className = '', ...props }) {
    return (
        <svg
            className={`w-6 h-6 text-blue-700 dark:text-blue-300 transform transition-transform duration-200 ${className}`}
            fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}
        >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
    );
}

export function BookmarkIcon({ className = '', ...props }) {
    return (
        <svg className={`w-6 h-6 text-blue-500 dark:text-blue-300 ${className}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" {...props}>
            <path d="M5 5v14l7-7 7 7V5z" />
        </svg>
    );
}

export function BookmarkFilledIcon({ className = '', ...props }) {
    return (
        <svg className={`h-6 w-6 text-blue-400 dark:text-blue-300 ${className}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" {...props}>
            <path d="M5 5v14l7-7 7 7V5z" />
        </svg>
    );
}

export function CloseIcon({ className = '', ...props }) {
    return (
        <svg className={`w-5 h-5 text-red-500 ${className}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" {...props}>
            <path d="M6 18L18 6M6 6l12 12" />
        </svg>
    );
}

export function SearchIcon({ className = '', ...props }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`size-6 ${className}`} {...props}>
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>
    );
}

export function TrashIcon({ className = '', ...props }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`size-6 ${className}`} {...props}>
            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
        </svg>
    );
}