import { useEffect, useState } from "react"




export const useLoadingDelay = (isLoading: boolean, delay: number) => {
	const [showPreloader, setShowPreloader] = useState(false);

	useEffect(() => {
		let timer: number | null = null;
		if (isLoading) {
			timer = setTimeout(() => {
				setShowPreloader(true);
			}, delay);
		} else {
			if (timer !== null) {
				clearTimeout(timer);
			}

			setShowPreloader(false);
		}

		return () => { if (timer !== null) clearTimeout(timer) };
	})

	return showPreloader;
}