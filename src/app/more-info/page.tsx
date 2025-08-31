import { Container } from "@/components/container";

export default function MoreInfo() {
    return (
        <Container>
            <div className="w-full min-h-[calc(100vh-160px)] flex flex-col gap-4 justify-top pt-8">
                <h1>This website was created using NextJS 15</h1>
                <h1>Taiwilind CSS for design building</h1>
                <h1>React Hook Form + zod library for form validation</h1>
                <h1>Form handling with serverActions</h1>
                <h1>Authetication is handled with NextAuth.js (Google provider)</h1>
                <h1>Prisma.io ORM for database migration system</h1>
                <h1>MongoDB database</h1>
                <h1>API Routes for internal back-end routes</h1>
            </div>
        </Container>
    )
}