import { defineConfig } from '@playwright/test';
import { CustomConfigOptions } from './src/global/test';
import { buildProjectsFor } from './project-configurations';
import * as dotenv from 'dotenv';
import { TraceMode } from 'playwright/types/test';
import { globalConfig } from '@global/constants/global-config.const';

dotenv.config();
const CIRetries = Number(process.env.RETRIES || '1');
const CITrace = (process.env.PW_TRACE as TraceMode) || 'on-first-retry';

export default defineConfig<CustomConfigOptions>({
	testDir: './src/specs',
	testMatch: '**/*.spec.ts',
	forbidOnly: globalConfig.ifCI,
	expect: { timeout: 5000 },
	reportSlowTests: { max: 10, threshold: 8 * 60 * 1000 },
	retries: globalConfig.ifCI ? CIRetries : 0,
	workers: Number(process.env.WORKERS),
	timeout: 60 * 1000,
	reporter: [['list'], ['html']],
	use: {
		viewport: { width: 1620, height: 980 },
		actionTimeout: 30000,
		ignoreHTTPSErrors: true,
		bypassCSP: true,
		navigationTimeout: 60000,
		trace: globalConfig.ifCI ? CITrace : 'retain-on-failure',
		screenshot: 'only-on-failure',
		video: 'off',
	},

	projects: [...buildProjectsFor(process.env.PW_ENV)],
});
