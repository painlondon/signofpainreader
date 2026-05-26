import Reader from '@/components/templates/reader/Reader'
import type { IHome } from '@/shared/interfaces/components/screens/home/home.interface'
import type { FC } from 'react'
import HomeAbout from './about/HomeAbout'
import HomeComing from './coming/HomeComing'
import HomeDonate from './donate/HomeDonate'
import HomeHero from './hero/HomeHero'
import HomeProduct from './product/HomeProduct'
import HomeSocial from './social/HomeSocial'

const Home: FC<IHome> = ({ page }) => {
	return (
		<>
			<HomeHero page={page} />
			<HomeProduct page={page} />
			<HomeAbout page={page} />
			<HomeSocial page={page} />
			{/* <HomeReader page={page} /> */}
			<HomeDonate page={page} />
			<HomeComing page={page} />
			<Reader
				page={page}
				url={page.product.reference.epub.reference.url}
				donatePage={
					page.product.reference?.donatePage?.value
						? Number(page.product.reference.donatePage.value)
						: undefined
				}
				donateButtonLabel={page.product?.reference?.donateButtonLabel?.value}
				donateButtonLink={page.product?.reference?.donateButtonLink?.value}
				gatewayPage={
					page.product.reference?.gatewayPage?.value
						? Number(page.product.reference.gatewayPage.value)
						: undefined
				}
				content={{
					heading: page.product.reference?.gatewayHeading?.value || '',
					description: page.product.reference?.gatewayDescription?.value || '',
					submit: page.product.reference?.gatewaySubmit?.value || '',
					skip: page.product.reference?.gatewaySkip?.value || '',
					success: page.product.reference?.gatewaySuccess?.value || '',
					error: page.product.reference?.gatewayError?.value || '',
				}}
			/>
		</>
	)
}

export default Home
