export const isDev: boolean = true;

const supportsAnsiColor =
	globalThis['process']?.stdout && globalThis['process']?.stdout?.isTTY;

type LogLevel = 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'silent';

interface LoggerSettings {
	level: LogLevel;
}

const SETTINGS_SYMBOL = Symbol('jsfe.logger.settings');

const defaultSettings: LoggerSettings = { level: 'trace' };

// Initialize global settings if not already set
if (!(globalThis as any)[SETTINGS_SYMBOL]) {
	(globalThis as any)[SETTINGS_SYMBOL] = { ...defaultSettings };
}

// Runtime accessor
function getSettings(): LoggerSettings {
	return (globalThis as any)[SETTINGS_SYMBOL] as LoggerSettings;
}

// Allow users to configure dynamically
export function setLoggerLevel(level: LogLevel) {
	getSettings().level = level;
}

const logLevelOrder: LogLevel[] = [
	'trace',
	'debug',
	'info',
	'warn',
	'error',
	'silent',
];

function shouldLog(targetLevel: LogLevel): boolean {
	const currentLevel = getSettings().level;
	return (
		logLevelOrder.indexOf(targetLevel) >= logLevelOrder.indexOf(currentLevel)
	);
}

function format(level: LogLevel, namespace: string, args: any[]) {
	if (supportsAnsiColor) {
		const colorMap: Record<string, string> = {
			debug: '\x1b[90m', // gray
			info: '\x1b[34m', // blue
			warn: '\x1b[33m', // yellow
			error: '\x1b[31m', // red
		};
		const reset = '\x1b[0m';
		const color = colorMap[level] || '';
		return [`${color}[${level.toUpperCase()}][${namespace}]${reset}`, ...args];
	} else {
		const colorMap: Record<string, string> = {
			debug: 'color: gray',
			info: 'color: blue',
			warn: 'color: orange',
			error: 'color: red',
		};
		const style = colorMap[level] || 'color: black';
		return [
			`%c[${level.toUpperCase()}]%c[${namespace}]`,
			style,
			'color: inherit',
			...args,
		];
	}
}

export class Logger {
	constructor(private namespace = '') {}

	trace(...args: any[]) {
		if (shouldLog('trace'))
			console.trace(...format('trace', this.namespace, args));
	}
	debug(...args: any[]) {
		if (shouldLog('debug'))
			console.debug(...format('debug', this.namespace, args));
	}
	info(...args: any[]) {
		if (shouldLog('info'))
			console.info(...format('info', this.namespace, args));
	}
	warn(...args: any[]) {
		if (shouldLog('warn'))
			console.warn(...format('warn', this.namespace, args));
	}
	error(...args: any[]) {
		if (shouldLog('error'))
			console.error(...format('error', this.namespace, args));
	}
}
