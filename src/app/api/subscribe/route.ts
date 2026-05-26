import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
	const { email } = await req.json()

	const res = await fetch(
		'https://a.klaviyo.com/api/profile-subscription-bulk-create-jobs/',
		{
			method: 'POST',
			headers: {
				Authorization: `Klaviyo-API-Key ${process.env.KLAVIYO_TOKEN}`,
				'Content-Type': 'application/json',
				revision: '2024-02-15',
			},
			body: JSON.stringify({
				data: {
					type: 'profile-subscription-bulk-create-job',
					attributes: {
						profiles: {
							data: [
								{
									type: 'profile',
									attributes: {
										email,
									},
								},
							],
						},
					},
					relationships: {
						list: {
							data: {
								type: 'list',
								id: process.env.KLAVIYO_ID,
							},
						},
					},
				},
			}),
		}
	)

	if (!res.ok) {
		const error = await res.json()
		return NextResponse.json(error, { status: res.status })
	}

	return NextResponse.json({ success: true })
}
