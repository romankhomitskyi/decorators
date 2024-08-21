import { devices, Project } from '@playwright/test';
import * as dotenv from 'dotenv';
import * as process from 'process';
import { Environment } from '@global/enums/environment';

dotenv.config();

const environments = {
	[Environment.Local]: {
		baseUrl: 'playwright.dev',
		mailUrl: 'playwright.dev',
	},
	[Environment.Staging]: {
		baseUrl: 'playwright.dev',
		mailUrl: 'playwright.dev',
	},
};

function getUrls(envName: Environment): Record<string, string> {
	const environmentConfig = environments[envName];
	const baseUrl = environmentConfig.baseUrl;

	return {
		baseURL: `https://${baseUrl}`,
		mailUrl: `https://mail.${environmentConfig.mailUrl}`,
		apiUrl: `https://api.${baseUrl}`,
		host: baseUrl,
	};
}

const { host, ...urls } = getUrls(process.env.PW_ENV as Environment);
global.HOST = host;

export const buildProjectsFor = (environment: string): Project[] => {
	const viewport = { width: 1620, height: 980 };

	return [
		{
			name: `${environment}-chrome`,
			use: {
				...urls,
				...devices['Desktop Chrome'],
				viewport,
				isMobile: false,
			},
		},
		{
			name: `${environment}-safari`,
			use: {
				...urls,
				...devices['Desktop Safari'],
				viewport,
				isMobile: false,
			},
		},
		{
			name: `${environment}-mobile`,
			grepInvert: /@onlyDesktop/,
			use: {
				...urls,
				...devices['iPhone 15 Pro Max'],
				isMobile: true,
			},
		},
	];
};
