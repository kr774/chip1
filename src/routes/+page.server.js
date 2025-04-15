// @ts-nocheck
import { redirect } from '@sveltejs/kit';
import { SECRET_KEY, IV } from '$env/static/private';
import crypto from 'crypto';

/** @type {import('./$types').LayoutServerLoad} */
// @ts-ignore
export async function load({ request, url, locals }) {
	const code = url.searchParams.get('code');
	const userAgent = request.headers.get('user-agent');
	let decrypted = '';
	if (code) {
		const decipher = crypto.createDecipheriv('aes-256-cbc', SECRET_KEY.slice(0, 32), IV);
		decrypted = decipher.update(code, 'hex', 'utf8');
		decrypted += decipher.final('utf8');
		console.log('Decrypted code:', decrypted);
	}

	if (!locals.user) {
		console.log(`Requested code ${code}`);
		console.log(`User-Agent: ${userAgent}`);

		

		// iOS
		const iosRegex = /mac|iPhone/i; 
		if (iosRegex.test(userAgent)) { 
			console.log('Redirecting for iOS');
			redirect(307, `sms:888222&body=${decrypted}`);
		}
		// Android or other platforms
		else {
			console.log('Sending SMS link for NOT iPhone');
			const code = url.searchParams.get('code');
			const href = `sms:888222;?&body=${decrypted}`;

			redirect(307, `sms:888222;?&body=${decrypted}`);
		};



	}
}

