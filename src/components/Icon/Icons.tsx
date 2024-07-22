import React from 'react';

interface IconProps {
	type?: string;
}

export const Icons: React.FC<IconProps> = ({ type }) => {
	switch (type) {
		case 'HotWaterAreaMeter':
			return (
				<svg
					width="10"
					height="14"
					viewBox="0 0 10 14"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M5.89218 0.42C5.89442 0.39678 5.89999 0.366731 5.89999 0.341464C5.89999 0.152976 5.76063 0 5.5889 0C5.51579 0 5.46441 0.0300488 5.44452 0.0385853C4.3883 0.491366 0.299988 4.95669 0.299988 8.87803C0.299988 11.7067 2.38941 14 4.96665 14C7.80059 14 9.63332 11.38 9.63332 8.87803C9.63332 4.71663 5.16486 3.94834 5.89218 0.42Z"
						fill="#F46B4D"
					/>
				</svg>
			);
		case 'ColdWaterAreaMeter':
			return (
				<svg
					width="10"
					height="14"
					viewBox="0 0 10 14"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M5.89218 0.42C5.89442 0.39678 5.89999 0.366731 5.89999 0.341464C5.89999 0.152976 5.76063 0 5.5889 0C5.51579 0 5.46441 0.0300488 5.44452 0.0385853C4.3883 0.491366 0.299988 4.95669 0.299988 8.87803C0.299988 11.7067 2.38941 14 4.96665 14C7.80059 14 9.63332 11.38 9.63332 8.87803C9.63332 4.71663 5.16486 3.94834 5.89218 0.42Z"
						fill="#3698FA"
					/>
				</svg>
			);
		case 'DeleteItem':
			return (
				<svg
					width="40"
					height="40"
					viewBox="0 0 40 40"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<rect width="40" height="40" rx="8" fill="#FED7D7" />
					<path d="M19.3333 18V24H18V18H19.3333Z" fill="#9B2C2C" />
					<path d="M22 18V24H20.6666V18H22Z" fill="#9B2C2C" />
					<path
						fillRule="evenodd"
						clipRule="evenodd"
						d="M16.8528 12.6667H23.1472L23.8138 14.6667H26.6666V16H25.3333L24.6666 27.3334H15.3333L14.6666 16H13.3333V14.6667H16.1861L16.8528 12.6667ZM17.5916 14.6667H22.4084L22.1861 14H17.8138L17.5916 14.6667ZM16 16L16.6666 26H23.3333L24 16H16Z"
						fill="#9B2C2C"
					/>
				</svg>
			);
		case 'Preload':
			return (
				<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 200 200">
					<path fill="#AAACAF" stroke="#AAACAF" stroke-width="2" transform-origin="center" d="m148 84.7 13.8-8-10-17.3-13.8 8a50 50 0 0 0-27.4-15.9v-16h-20v16A50 50 0 0 0 63 67.4l-13.8-8-10 17.3 13.8 8a50 50 0 0 0 0 31.7l-13.8 8 10 17.3 13.8-8a50 50 0 0 0 27.5 15.9v16h20v-16a50 50 0 0 0 27.4-15.9l13.8 8 10-17.3-13.8-8a50 50 0 0 0 0-31.7Zm-47.5 50.8a35 35 0 1 1 0-70 35 35 0 0 1 0 70Z">
						<animateTransform type="rotate" attributeName="transform" calcMode="spline" dur="1.8" values="0;120" keyTimes="0;1" keySplines="0 0 1 1" repeatCount="indefinite"></animateTransform>
					</path>
				</svg>

			);
	}
};
