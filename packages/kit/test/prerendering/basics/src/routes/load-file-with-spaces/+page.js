/** @type {import('@sveltejs/kit').Load} */
export async function load({ fetch }) {
	// @ts-ignore static assets are not supported by new fetch TODO
	const r1 = await fetch('/file%20with%20spaces.json');
	const p1 = await r1.json();

	// @ts-ignore error static assets are not supported by new fetch TODO
	const r2 = await fetch('/file with spaces.json');
	const p2 = await r2.json();

	if (p1.answer !== p2.answer) {
		throw new Error('oops');
	}

	return p1;
}
