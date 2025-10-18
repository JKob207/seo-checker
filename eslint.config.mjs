import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
	baseDirectory: __dirname,
});

const eslintConfig = [
	...compat.extends("next/core-web-vitals", "next/typescript"),
	{
		ignores: [
			"node_modules/**",
			".next/**",
			"out/**",
			"build/**",
			"next-env.d.ts",
		],
		rules: {
			"jsx-quotes": [2, 'prefer-single'],
			"comma-dangle": ["error", {
				"arrays": "only-multiline",
				"objects": "only-multiline",
				"imports": "never",
				"exports": "never",
				"functions": "never",
			}],
			"semi": ["error", "always"],
			"no-trailing-spaces": "error",
			"indent": ["error", "tab"]
		},
	},
];

export default eslintConfig;
