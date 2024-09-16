import { useQuery } from "@apollo/client"
import { GET_AUTH_USER } from "../../graphql/queries/user.query"


export default function Listing() {
    const {data, error, loading} = useQuery(GET_AUTH_USER)

    if (error && loading) return null

    // console.log(data)

    return (
        <div>
            <h1>Listing</h1>
            <p>Hello {data?.authUser.username}</p>
        </div>
    )
}