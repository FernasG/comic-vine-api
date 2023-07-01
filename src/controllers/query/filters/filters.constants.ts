import { DataSource } from "typeorm";
import { EditorsCharactersVolumes, EditorsVolumesWritten, EditorsCountry } from "./editors.filters";
import { CharactersMoviesAppearances } from "./characters.filters";
import { PowersCharactersOccurrences } from "./powers.filters";
import { VolumesIssues } from "./volumes.filters";
import { Response } from "../query.interface"


export const FiltersMap: { [x: string]: ((connection: DataSource) => Promise<Response>) } = {
    1: CharactersMoviesAppearances,
    // 2: null,
    // 3: null,
    // 4: null,
    // 5: null,
    // 6: null,
    // 7: null,
    // 8: null,
    9: PowersCharactersOccurrences,
    10: VolumesIssues,
    11: EditorsVolumesWritten,
    12: EditorsCharactersVolumes,
    13: EditorsCountry
}