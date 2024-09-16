import { useMutation } from "@apollo/client"
import { SIGNUP } from "../../graphql/mutations/user.mutation"

export default function Registration() {
    const [signUp, {data, loading, error}] = useMutation(SIGNUP)

    const sighUpHandler = async (e: any) => {
        e.preventDefault()

        try {
            const res = await signUp()
            const token = res.data.login.userJwtToken.token

            localStorage.setItem("token", token)
        } catch (error) {
            console.log("Registration > sighUpHandler > Error >> ", error)
        }
    }

    if (loading) return 'Submitting...';
    if (error) return `Submission error! ${error.message}`;

    return (
        <div>
            <h1>Registration Title</h1>
            <button onClick={sighUpHandler}>Register new User</button>
        </div>
    )
}