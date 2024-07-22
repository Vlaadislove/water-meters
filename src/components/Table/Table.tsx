import './Table.css';
import { Icons } from '../Icon/Icons';
import { observer } from 'mobx-react-lite';
import rootStore from '../../store/store';
import { useEffect, useRef } from 'react';
import { renderPageNumbers } from '../../utils/utils';
import { useLoadingDelay } from '../../hook/useLoadingDelay';


const Table = observer(() => {
	const showPreloader = useLoadingDelay(rootStore.isLoading, 1000);
	const containerRef = useRef<HTMLDivElement>(null);

	const handleScrollToTop = () => {
		if (containerRef.current) {
			containerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
			console.log(containerRef.current)
		}
	};
	useEffect(() => {
		rootStore.fetchMeters();
	}, [rootStore.currentPage]);

	return (
		<div className="table-container">
			<div className="table-title">
				<p>Список счетчиков</p>
			</div>
			<div className="table-header">
				<div className="header-item">№</div>
				<div className="header-item">Тип</div>
				<div className="header-item">Дата установки</div>
				<div className="header-item">Автоматический</div>
				<div className="header-item">Текущие показания</div>
				<div className="header-item">Адрес</div>
				<div className="header-item">Примечание</div>
			</div>
			<div className="table-body" ref={containerRef}>
				{showPreloader ? (
					<div className='preloader'>
						<Icons type="Preload" />
					</div>
				) : (
					rootStore.meters.map((meter, index) => (
						<div className="table-row" key={index} >
							<div className="body-item item-number">
								{(rootStore.currentPage - 1) * rootStore.limit + index + 1}
							</div>
							<div className="body-item ">
								<Icons type={meter._type[0]} />
								{meter._type[0] === 'HotWaterAreaMeter' && <p>ГВС</p>}
								{meter._type[0] === 'ColdWaterAreaMeter' && <p>ХВС</p>}
							</div>
							<div className="body-item">{meter.formattedInstallationDate}</div>
							<div className="body-item">
								{meter.is_automatic === null
									? 'неизвестно'
									: meter.is_automatic
										? 'да'
										: 'нет'}
							</div>
							<div className="body-item">{meter.initial_values[0]}</div>
							<div className="body-item">
								{rootStore.areas.find((area) => area.id === meter.area.id)
									?.address || 'Загрузка...'}
							</div>
							<div
								onClick={() => rootStore.deleteMeter(meter.id)}
								className="button-delete_item"
							>
								<Icons type="DeleteItem" />
							</div>
							<div className="body-item">{meter.description}</div>
						</div>
					))
				)}
			</div>
			<div className="table-footer">
				{renderPageNumbers().map((page, i) => (
					<button
						disabled={typeof page === 'string' ? true : false}
						className={
							rootStore.currentPage === page
								? 'button-pagination-active'
								: 'button-pagination'
						}
						key={i}
						onClick={() => {
							rootStore.loadPage(page as number);
							handleScrollToTop()
						}}
					>
						{page}
					</button>
				))}
			</div>
		</div>
	);
});

export default Table;
