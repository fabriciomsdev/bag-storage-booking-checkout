setup:
	npm install --legacy-peer-deps

run_web:
	export NODE_OPTIONS=--openssl-legacy-provider && npm run web