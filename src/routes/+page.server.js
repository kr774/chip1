// @ts-nocheck
import { redirect } from '@sveltejs/kit';


/** @type {import('./$types').LayoutServerLoad} */
// @ts-ignore
export async function load({ request, url, locals }) {
	const code = url.searchParams.get('code');
	const userAgent = request.headers.get('user-agent');

	if (!locals.user) {
		console.log(`Requested code ${code}`);
		console.log(`User-Agent: ${userAgent}`);

		

		// iOS
		const iosRegex = /mac|iPhone/i; 
		if (iosRegex.test(userAgent)) { 
			console.log('Redirecting for iOS');
			redirect(307, `sms:888222&body=${code}`);
		}
		// Android or other platforms
		else {
			console.log('Sending SMS link for NOT iPhone');
			const code = url.searchParams.get('code');
			const href = `sms:888222;?&body=${code}`;

			redirect(307, `sms:888222;?&body=${code}`);
		};



	}
}

