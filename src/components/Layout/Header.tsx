type props = {
    className?:string
}

export function Header({className = ""}:props){
    return (
        <header className={`${className}`}>
            header
        </header>
    )
}