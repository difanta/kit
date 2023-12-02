/**
 * Creates types for all endpoint routes
 * TODO: cover all routing cases (optional, typed and Rest parameters slugs)
 * @param {string} str
 */
export function parseSlugs(str) {
	let changed;
	let index = 0;
	const validators = [];
	do {
		changed = false;
		if (str.search(/\(.*?\)\/?/) !== -1) {
			changed = true;
			str = str.replace(/\(.*?\)\/?/, '');
		}
		if (str.search(/\/?\[\[.*?\]\]/) !== -1) {
			changed = true;
			str = str.replace(/\/?\[\[.*?\]\]/, `\${infer OptionalSlug${index}}`);
			validators.push(`ValidateOptional<OptionalSlug${index++}>`);
		}
		if (str.search(/\/?<<.*?>>/) !== -1) {
			changed = true;
			str = str.replace(/\/?<<.*?>>/, `\${infer OptionalSlug${index}}`);
			validators.push(`ValidateOptional<OptionalSlug${index++}>`);
		}
		if (str.search(/\/?\/?\[\.\.\..*?\]/) !== -1) {
			changed = true;
			str = str.replace(/\/?\[\.\.\..*?\]/, `\${infer RestSlug${index}}`);
			validators.push(`ValidateRest<RestSlug${index++}>`);
		}
		if (str.search(/\/?<\.\.\..*?>/) !== -1) {
			changed = true;
			str = str.replace(/\/?<\.\.\..*?>/, `\${infer RestSlug${index}}`);
			validators.push(`ValidateRest<RestSlug${index++}>`);
		}
		if (str.search(/\[.*?\]/) !== -1) {
			changed = true;
			str = str.replace(/\/?\[.*?\]/, `\${infer RequiredSlug${index}}`);
			validators.push(`ValidateRequired<RequiredSlug${index++}>`);
		}
		if (str.search(/\/?<.*?>/) !== -1) {
			changed = true;
			str = str.replace(/\/?<.*?>/, `\${infer RequiredSlug${index}}`);
			validators.push(`ValidateRequired<RequiredSlug${index++}>`);
		}
	} while (changed);
	if (!endsWithSlug(str)) {
		str += '${infer Trailing}';
		validators.push('ValidateTrailing<Trailing>');
	}
	const validator_str =
		validators.length > 0
			? `UnionAllTrue<${validators.length > 1 ? validators.join(' | ') : validators.join('')}>`
			: 'true';

	return {
		matcher_str: str,
		validator_str
	};
}

/**
 *
 * @param {string} str
 */
function endsWithSlug(str) {
	return str.endsWith('}');
}
