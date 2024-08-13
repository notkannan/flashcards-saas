import { SignIn } from "@clerk/nextjs";

export default function LoginPage() {
    return(
        <div className="absolute inset-0 w-screen h-screen flex justify-center items-center">
            <SignIn />
        </div>
        
    )

}