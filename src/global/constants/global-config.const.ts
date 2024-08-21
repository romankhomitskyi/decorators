import { coerceToBoolean } from '@src/support/utils/utils';
import { Environment } from '@global/enums/environment';
import process from 'process';

export const globalConfig = {
	env: (process.env.PW_ENV as Environment) || Environment.Local,
	ifCI: coerceToBoolean(process.env.PW_CI),
};
