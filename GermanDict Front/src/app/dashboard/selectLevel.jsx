import LevelCard from "./levelCard";





export default function SelectLevel(props){

    const items = [];

    for (let i = 1; i < 11; i++) {
      items.push(i);
    }
    
    return (

        <div>
            {items.map(level => {
                return <LevelCard number={level} userId={props.userId}></LevelCard>
            })}


            
        </div>
    )
}