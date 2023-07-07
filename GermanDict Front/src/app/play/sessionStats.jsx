


export default function SessionStats(props){




    return (
        <div>
            {props.red_cards.length > props.yellow_cards.length + props.green_cards.length?<h1>Keep practicing to get better</h1>:
            props.green_cards.length > props.yellow_cards.length + props.red_cards.length? <h1>You are getting really good!</h1>: ""}
            

        </div>
    )
}