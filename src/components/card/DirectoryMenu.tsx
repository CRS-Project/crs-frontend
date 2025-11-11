import Link from "next/link";

interface DirectoryMenuProps {
	title: string;
	description: string;
	linkHref: string;
	value: string;
}

export default function DirectoryMenu({
	title,
	description,
	linkHref,
	value,
}: DirectoryMenuProps) {
	return (
		<div className="px-6 py-4 border rounded-lg bg-blue-600 text-white flex gap-14 flex-col">
			<div>
				<h1 className="font-bold text-[64px]">{title}</h1>
				<p className="font-semibold text-[16px]">{description}</p>
			</div>
			<Link
				href={linkHref}
				className="w-full bg-white rounded-lg text-sm text-blue-600 px-4 py-2 text-center font-semibold hover:bg-gray-100 transition-all duration-200 ease-in-out"
			>
				{value}
			</Link>
		</div>
	);
}
