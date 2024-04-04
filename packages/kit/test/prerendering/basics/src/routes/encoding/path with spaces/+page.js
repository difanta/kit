/** @type {import('@sveltejs/kit').Load} */
export async function load({ fetch }) {
	// @ts-ignore error static assets are not supported by new fetch TODO
	const a = await fetch('/encoding/path with spaces.json');
	// @ts-ignore error static assets are not supported by new fetch TODO
	const b = await fetch('/encoding/path%20with%20encoded%20spaces.json');

	return {
		a: await a.json(),
		b: await b.json()
	};
}
