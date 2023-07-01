import { Characters, Editors, Movies, SuperPowers, Volumes } from "@database";

export const TableMap: Readonly<{ [x: string]: { entity: any, relations: string[] } }> = {
    characters: { entity: Characters, relations: ['powers', 'editors', 'movies'] },
    editors: { entity: Editors, relations: ['volumes', 'characters'] },
    powers: { entity: SuperPowers, relations: ['characters'] },
    movies: { entity: Movies, relations: ['characters'] },
    volumes: { entity: Volumes, relations: ['editors'] }
};