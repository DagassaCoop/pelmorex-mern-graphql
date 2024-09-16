import { Link } from "react-router-dom"
import { useMutation } from "@apollo/client"

// Mutations
import { LOGIN } from "../../graphql/mutations/user.mutation"

export default function Login() {
    const [login, { data, loading, error }] = useMutation(LOGIN)

    const loginHandler = async (e: any) => {
        e.preventDefault()
        
        try {
            const res = await login({ variables: { input: { email: 'free@gmail.com', password: '1234' } } })
            const token = res.data.login.userJwtToken.token
            
            localStorage.setItem("token", token)
        } catch (error) {
            console.log("Login > loginHandler > Error >> ", error)
        }
    }

    if (loading) return 'Submitting...';
    if (error) return `Submission error! ${error.message}`;

    return (
        <div className="login-page">
            <div>
                <div>
                    <h1>Login</h1>
                </div>
                <form action=""></form>
                <div>
                    <Link to='/registration'>Create new account.</Link>
                </div>
            </div>
        </div>
    )
}