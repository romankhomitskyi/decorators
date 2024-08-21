import eslint from '@eslint/js';
import playwright from 'eslint-plugin-playwright';
import tseslint from 'typescript-eslint';

export default tseslint.config(
	{
		ignores: ['**/*.js', 'node_modules/', 'playwright-report/'],
	},
	eslint.configs.recommended,

	{
		languageOptions: {
			globals: {
				window: 'readonly',
				global: 'writable',
				document: 'readonly',
				console: 'readonly',
				process: 'readonly',
				'Buffer': 'readonly',
				setTimeout: 'readonly',
			},
		},
		rules: {
			'no-unused-vars': 'off',
		},
	},

	{
		files: ['**/*.ts', '*.ts'],
		plugins: {
			'@typescript-eslint': tseslint.plugin,
		},
		languageOptions: {
			parser: tseslint.parser,
			parserOptions: {
				project: true,
			},
		},
		rules: {
			'@typescript-eslint/explicit-function-return-type': 'error',
			'@typescript-eslint/explicit-module-boundary-types': 'error',
			'@typescript-eslint/no-var-requires': 'off',
			'@typescript-eslint/no-inferrable-types': 'warn',
			'@typescript-eslint/member-ordering': 'error',
			'@typescript-eslint/no-floating-promises': 'error',
			'@typescript-eslint/no-explicit-any': 'off',
			'@typescript-eslint/no-unused-vars': [
				'error',
				{
					'args': 'all',
					'argsIgnorePattern': '^_',
					'caughtErrors': 'all',
					'caughtErrorsIgnorePattern': '^_',
					'destructuredArrayIgnorePattern': '^_',
					'varsIgnorePattern': '^_',
					'ignoreRestSiblings': true,
				},
			],
			'@typescript-eslint/explicit-member-accessibility': [
				'error',
				{ 'overrides': { 'accessors': 'off', 'constructors': 'no-public' } },
			],
		},
	},
	{
		plugins: {
			playwright: playwright,
		},
		rules: {
			'playwright/no-wait-for-selector': 'error',
			'playwright/expect-expect': 'off',
			'playwright/no-skipped-test': 'off',
			'playwright/no-page-pause': 'error',
			'playwright/no-conditional-in-test': 'off',
			'playwright/no-focused-test': 'error',
		},
	}
);
