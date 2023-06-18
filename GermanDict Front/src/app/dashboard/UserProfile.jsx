import LogOutButton from "./LogOutButton"



export default function UserProfile(props){

    let user = null;
    try {
      user = JSON.parse(localStorage.getItem("user"));
    } catch (error) {
      user = null
    }


    return (

        <div>
            <h1>image</h1>
            <h1>{user.username}</h1>
            <h2>Learned words: </h2>

            <LogOutButton></LogOutButton>

        </div>
    )
}