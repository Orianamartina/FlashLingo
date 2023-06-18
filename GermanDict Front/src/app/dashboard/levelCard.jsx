

import { useRouter } from 'next/navigation';




export default function LevelCard(props){

    const {push} = useRouter()
    
    const handleLevelClick = (level)  => {
        push(`/level${level}`)
    }
    
    return (

        <div>
            <button onClick={() => handleLevelClick(props.number)}>{props.number}</button>


            
        </div>
    )
}