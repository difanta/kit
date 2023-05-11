/** @type {import('@sveltejs/kit').Load} */
export async function load({ fetch }) {
	const res = await fetch('/valid.json');
	if (res.ok) {
		const { answer } = await res.json();
		return { answer };
	}
}
