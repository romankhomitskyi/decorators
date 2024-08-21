interface ClassMappings {
	mobileClass: Proxy;
	desktopClass: ClassConstructor;
}

const classStore: ClassMappings[] = [];

type ClassConstructor = new (...args: any[]) => any;
interface Proxy extends ClassConstructor {
	originalDesktopClass?: any;
	isProxying?: boolean;
}

export const Desktop = () => {
	return function (DesktopClass: ClassConstructor, _context: Record<string, any>): Proxy {
		class Proxy extends DesktopClass {
			public static originalDesktopClass = DesktopClass;
			public static isProxying = false; // Flag to prevent infinite recursion

			constructor(...args: any[]) {
				if (global.IS_MOBILE && !Proxy.isProxying) {
					// Find the corresponding mobile component
					const MobileClass = classStore.find(item => item.desktopClass === DesktopClass)?.mobileClass;
					// If mobile component found, create an instance of it
					if (MobileClass) {
						Proxy.isProxying = true;
						const instance = new MobileClass(...args);
						Proxy.isProxying = false;
						return instance;
					}
				}
				// Otherwise, create an instance of the desktop component
				super(...args);
			}
		}
		return Proxy;
	};
};

export const Mobile = () => {
	return function (MobileClass: Proxy, _context: Record<string, any>): Proxy {
		const DesktopClass = MobileClass.originalDesktopClass;
		// If the desktop class exists, store the mapping
		if (DesktopClass) {
			classStore.push({
				mobileClass: MobileClass,
				desktopClass: DesktopClass,
			});
		}
		return MobileClass;
	};
};
