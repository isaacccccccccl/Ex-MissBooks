
const { useState } = React

export function LongTxt({txt, leng=100}) {
    const [isExpanded, setIsExpanded] = useState(false)

    function toggle() {
        setIsExpanded(prevState => !prevState)
    }

    if (txt.length < leng) return <div>{txt}</div>
    const displayText = isExpanded ? txt : txt.slice(0, leng)
    return(
        <section>
            <div>{displayText}</div>
            <button onClick={toggle}>
                {isExpanded ? "Read less" : "Read more"}
            </button>
        </section>
    )
}