type ClassConstructor = new (...args: any[]) => any;

const classMappings = new Map<Function, { mobile?: ClassConstructor; desktop?: ClassConstructor }>();

function mapClass(classConstructor: ClassConstructor, classType: 'mobile' | 'desktop'): void {
	const baseClass = Object.getPrototypeOf(classConstructor);
	const mappings = classMappings.get(baseClass) ?? {};
	mappings[classType] = classConstructor;
	classMappings.set(baseClass, mappings);
}

export const Desktop = () => {
	return function (DesktopClass: ClassConstructor, _context: Record<string, any>): ClassConstructor {
		mapClass(DesktopClass, 'desktop');
		return DesktopClass;
	};
};

export const Mobile = () => {
	return function (MobileClass: ClassConstructor, _context: Record<string, any>): ClassConstructor {
		mapClass(MobileClass, 'mobile');
		return MobileClass;
	};
};
export const Base = () => {
	return function (BaseClass: ClassConstructor, _context: Record<string, any>): ClassConstructor {
		return class Proxy extends BaseClass {
			public static isProxying = false;
			constructor(...args: any[]) {
				if (!Proxy.isProxying) {
					Proxy.isProxying = true;

					try {
						const TargetClass = global.IS_MOBILE
							? classMappings.get(Proxy).mobile
							: classMappings.get(Proxy).desktop;

						if (TargetClass) {
							const instance = new TargetClass(...args);
							Proxy.isProxying = false;
							return instance;
						}
					} catch (error) {
						throw new Error(`Index file with exports might not has been created \n ${error.message}`);
					}
					Proxy.isProxying = false;
				}
				super(...args);
			}
		};
	};
};
