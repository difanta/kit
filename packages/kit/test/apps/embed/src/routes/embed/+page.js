/** @type {import('./$types.js').PageLoad} */
export async function load({ fetch }) {
	return {
		a: await fetch('/embed/a').then((x) => x.text()),
		b: await fetch('/embed/b').then((x) => x.text())
	};
}
