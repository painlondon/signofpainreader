module.exports = {
	apps: [
		{
			name: 'CLIENT',
			script: 'yarn',
			args: 'start',
			watch: true,
			ignore_watch: ['src', 'node_modules', '.next/cache'],
		},
	],
}
