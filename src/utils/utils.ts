import rootStore from "../store/store";

export const renderPageNumbers = () => {
	const totalPages = rootStore.totalPage;
	const currentPage = rootStore.currentPage;
	const pages = [];

	if (totalPages <= 10) {
		for (let i = 1; i <= totalPages; i++) {
			pages.push(i);
		}
	} else {
		if (currentPage <= 4) {
			pages.push(1, 2, 3, 4, 5, '...', totalPages);
		} else if (currentPage > totalPages - 4) {
			pages.push(
				1,
				'...',
				totalPages - 4,
				totalPages - 3,
				totalPages - 2,
				totalPages - 1,
				totalPages
			);
		} else {
			pages.push(
				1,
				'...',
				currentPage - 1,
				currentPage,
				currentPage + 1,
				'...',
				totalPages
			);
		}
	}
	return pages;
}


export const formatDate = (dateString: string) => {
	const date = new Date(dateString);
	return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
};