/** @type {import('./.svelte-kit/types/src/core/sync/write_types/test/slugs/$types').PageLoad} */
export const load = async ({ fetch }) => {
	let response = await fetch('/x');
	response = await fetch('/x/optional');
	return {};
};
