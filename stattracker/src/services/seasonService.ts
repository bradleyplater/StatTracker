import prisma from '../../prisma/prisma';
import { Season } from '@/types/seasonTypes';

export default class SeasonService {
    static async GetAllSeasons() {
        const response = await prisma.season.findMany();

        const seasons: Season[] = [];

        response.forEach((season) => {
            seasons.push({
                id: season.id,
                name: season.name,
                startDate: season.startDate,
                endDate: season.endDate,
            });
        });
        return seasons;
    }
}
