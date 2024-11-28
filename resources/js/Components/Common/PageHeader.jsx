export default function PageHeader({ title }) {
    return (
        <h2 className="font-semibold text-2xl text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-pink-400">
            {title}
        </h2>
    );
}
