import useAuthContext from "../../hooks/useAuthContext.hook"


export default function Listing() {
    const {authUser} = useAuthContext()

    return (
        <div>
            <h1>Listing</h1>
            <p>Hello {authUser?.username}</p>
        </div>
    )
}