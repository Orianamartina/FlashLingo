"use client";



export default function LoginButton(props){

    const handleClick = async (event) => {
        event.preventDefault()
    }

    return (

        <div>
            <button onClick={handleClick} type={props.type} form={props.form}>
                Login
            </button>


        </div>
    )
}