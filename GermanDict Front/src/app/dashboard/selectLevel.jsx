import LevelCard from "./levelCard";





export default function SelectLevel(){

    const items = [];

    for (let i = 1; i < 11; i++) {
      items.push(i);
    }
    
    return (

        <div>
            {items.map(level => {
                return <LevelCard number={level}></LevelCard>
            })}


            
        </div>
    )
}