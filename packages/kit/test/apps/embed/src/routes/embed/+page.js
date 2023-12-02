/** @type {import('./$types.js').PageLoad} */
export async function load({ fetch }) {
	return {
		a: fetch('/embed/a').then((x) => x.text()),
		b: fetch('/embed/b').then((x) => x.text())
	};
}
