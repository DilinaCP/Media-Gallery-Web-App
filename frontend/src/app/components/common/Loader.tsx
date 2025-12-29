"use client";

const Loader = () => (
	<div className="flex items-center justify-center w-full py-12">
		<div className="space-y-4">
			<div className="relative w-12 h-12 mx-auto">
				<div className="absolute inset-0 rounded-full border-3 border-slate-200"></div>
				<div className="absolute inset-0 rounded-full border-3 border-transparent border-t-purple-500 border-r-pink-500 animate-spin"></div>
			</div>
			<p className="text-sm font-medium text-slate-600 text-center">Loading...</p>
		</div>
	</div>
);

export default Loader;
