export default function ErrorMessage({ children }: { children: string }) {
    return (
        <p className="mt-8 text-red-600 font-semibold text-lg text-center w-full">{children}</p>

    )
}
