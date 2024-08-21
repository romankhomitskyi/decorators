import { Page, test as base} from '@playwright/test';

import {Application} from "@global/application";

interface Fixtures {
    app: Application;
}

export type CustomConfigOptions = {
    mailUrl: string;
    apiUrl: string;
    setUrls: string;
};

export const applicationFixture: {
    app: ({  page,  }: {page: Page}, use: any) => Promise<void>;
} = {
    app: async ({ page,  }, use) => {
        await use(new Application(page));
    },
};


export const test = base.extend<Fixtures, CustomConfigOptions>({
    mailUrl: [undefined, { option: true, auto: true, scope: 'worker' }],
    apiUrl: [undefined, { option: true, auto: true, scope: 'worker' }],
    setUrls: [
        async ({ mailUrl, apiUrl }, use): Promise<void> => {
            global.MAIL_URL = mailUrl;
            global.API_URL = apiUrl;
            await use('setUrls');
        },
        { scope: 'worker', auto: true },
    ],
    isMobile: async ({ isMobile }, use) => {
        global.IS_MOBILE = isMobile;
        await use(isMobile);
    },
    ...applicationFixture,
});
