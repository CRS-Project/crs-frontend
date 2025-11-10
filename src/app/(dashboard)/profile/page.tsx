"use client";

import { MoveLeft, Pencil } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import useAuthStore from "@/app/stores/useAuthStore";
import Button from "@/components/button/Button";
import EditUserModal from "./_containers/EditUserModal";

export default function ProfilePage() {
	const [isOpen, setIsOpen] = React.useState(false);
	const { user } = useAuthStore();
	return (
		<div className="p-8 max-md:p-0 max-xl:p-4">
			<div className="w-full relative h-fit">
				<Image
					src="/images/dashboard/profile/bg-header.png"
					alt="header"
					width={3000}
					height={1000}
				/>
				<Link
					href="/"
					className="absolute top-8 left-8 max-md:top-2 max-md:left-4"
				>
					<MoveLeft size={36} className="text-white" />
				</Link>
				<Image
					src={user?.photo_profile ?? "/images/user.png"}
					alt="propic"
					width={1000}
					height={1000}
					className="max-w-45 aspect-square w-[17.2%] absolute top-1/3 left-24 rounded-full max-md:left-16"
				/>
			</div>
			<div className="mt-[70px] px-9">
				<div className="gap-4 flex items-center">
					<h2 className="text-4xl font-bold ">{user?.name ?? "-"}</h2>
					<span className="px-4 py-2 font-medium bg-blue-500 text-white rounded-lg">
						{user?.role ?? "-"}
					</span>
				</div>
			</div>
			<div className="mt-7 px-9">
				<div className="px-7 py-8 border border-[#EDEDED]">
					<div className="flex justify-between h-fit">
						<h3 className="text-lg font-semibold">Profile Information</h3>
						<Button
							rightIcon={Pencil}
							className="px-8"
							size="lg"
							onClick={() => setIsOpen(true)}
						>
							Edit
						</Button>
					</div>
					<div className="grid grid-cols-2 w-1/2 gap-5 max-md:w-full max-xl:w-3/4 max-sm:grid-cols-1">
						<ProfileRow title="Full Name" value={user?.name ?? "-"} />
						<ProfileRow title="Institution" value={user?.institution ?? "-"} />
						<ProfileRow title="Email" value={user?.email ?? "-"} />
						<ProfileRow title="Initial" value={user?.initial ?? "-"} />
						<ProfileRow title="Discipline" value={user?.discipline ?? "-"} />
						<ProfileRow title="Institution" value={user?.institution ?? "-"} />
					</div>
				</div>
			</div>
			<EditUserModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
		</div>
	);
}

function ProfileRow({
	title,
	value,
}: {
	title: string;
	value: string | undefined;
}) {
	return (
		<div className="text-md font-medium">
			<p className="text-[#C1C1C1]">{title}</p>
			<p>{value}</p>
		</div>
	);
}
