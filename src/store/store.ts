import { types, onSnapshot, Instance, flow } from 'mobx-state-tree';
import axios from 'axios';
import { formatDate } from '../utils/utils';

type AreaModelType = Instance<typeof AreaModel>;
type MeterModelType = Instance<typeof MeterModel>;


const AreaModel = types.model('AreaModel', {
	id: types.identifier,
	address: types.maybe(types.string),
});

const MeterModel = types.model('MeterModel', {
	id: types.identifier,
	_type: types.array(types.string),
	area: types.reference(AreaModel),
	is_automatic: types.maybeNull(types.boolean),
	description: types.string,
	installation_date: types.string,
	initial_values: types.array(types.number),
	formattedInstallationDate: types.optional(types.string, ''),
});

const Store = types
	.model('Store', {
		meters: types.array(MeterModel),
		areas: types.array(AreaModel),
		limit: 20,
		offset: types.optional(types.number, 0),
		totalCount: types.optional(types.number, 0),
		currentPage: types.optional(types.number, 1),
		totalPage: types.optional(types.number, 0),
		isLoading: types.optional(types.boolean, false)
	})
	.actions((self) => {
		const fetchMeters = flow(function* () {
			try {
				self.isLoading = true
				const response = yield axios.get(
					'http://showroom.eis24.me/api/v4/test/meters/',
					{
						params: {
							limit: self.limit,
							offset: self.offset,
						},
					}
				);
				const meterData: MeterModelType[] = response.data.results;

				self.totalCount = response.data.count;
				self.totalPage = Math.ceil(response.data.count / self.limit);

				const uniqueAreaIds = new Set(meterData.map((meter) => meter.area.id));
				uniqueAreaIds.forEach((id) => {
					if (!self.areas.find((area) => area.id === id)) {
						self.areas.push({ id });
					}
				});

				self.meters.clear();
				meterData.forEach((meter) => {
					self.meters.push({
						id: meter.id,
						area: meter.area.id,
						_type: meter._type,
						is_automatic: meter.is_automatic,
						description: meter.description,
						installation_date: meter.installation_date,
						initial_values: meter.initial_values,
						formattedInstallationDate: formatDate(meter.installation_date),
					});
				});
				self.isLoading = false
				fetchAreas(Array.from(uniqueAreaIds));
			} catch (error) {
				console.error('Failed to fetch meters', error);
			}
		});
		const fetchAreas = flow(function* (areaIds: string[]) {
			try {
				const areaData: AreaModelType[] = [];
				let id: string;
				let address: string;

				for (let i = 0; i < areaIds.length; i++) {
					const response = yield axios.get(
						'http://showroom.eis24.me/api/v4/test/areas/',
						{
							params: { id__in: areaIds[i] },
						}
					);
					id = response.data.results[0].id;
					address =
						response.data.results[0].house.address +
						', ' +
						'кв. ' +
						String(response.data.results[0].str_number);
					areaData.push({ id, address });
				}

				areaData.forEach((area) => {
					const existingArea = self.areas.find((a) => a.id === area.id);
					if (existingArea) {
						existingArea.address = area.address;
					}
				});
			} catch (error) {
				console.error('Failed to fetch areas', error);
			}
		});
		const deleteMeter = flow(function* (meterId: string) {
			try {
				yield axios.delete(
					`http://showroom.eis24.me/api/v4/test/meters/${meterId}/`
				);
				fetchMeters();
			} catch (error) {
				console.error('Failed to fetch areas', error);
			}
		});

		const loadPage = (page: number) => {
			self.currentPage = page;
			self.offset = (page - 1) * self.limit;

			fetchMeters();
		};

		return { fetchMeters, loadPage, deleteMeter };
	});

const rootStore = Store.create({ meters: [], areas: [] });

onSnapshot(rootStore, (snapshot) => {
	console.log('Snapshot: ', snapshot);
});

export default rootStore;
